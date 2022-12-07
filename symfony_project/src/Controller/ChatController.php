<?php

namespace App\Controller;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Repository\UserRepository;
use App\Service\PrivateTopicHelper;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/chat/{topic}/{userId}', name: 'get_chat_conversation', methods: 'POST')]
    public function getChatConversation(ChatRepository $chatRepository, HubInterface $hub, string $topic, int $userId): JsonResponse
    {

        $update = new Update(
            [
                "https://example.com/chat/{$topic}",
                "https://example.com/user/{$userId}/?topic=" . urlencode("https://example.com/chat/{$topic}")
            ],
            json_encode([
                'chat' => $chatRepository->getAllMessagesOrderByDate($topic)
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Chat sent',
        ]);
    }

    #[Route('/chat/persist-message', name: 'chat_persist_message', methods: 'POST')]
    public function persistMessage(Request $request, ChatRepository $chatRepository, UserRepository $userRepository, EntityManagerInterface $entityManager, PrivateTopicHelper $topicHelper): JsonResponse
    {
        $topic = $request->request->get('topic');
        $content = $request->request->get('content');
        $user = $userRepository->findOneBy(['id' => $request->request->get('userId')]);
        $chat = $chatRepository->findOneBy(['topic' => $topic]);

        if (!$chat) {
            $chat = new Chat();
            $chat->setTopic($topic);
            $entityManager->persist($chat);
        }

        try {
            if (!$topicHelper->isUserInThisTopic($user->getId(), $topic)) {
                return $this->json([
                    'status' => 0,
                    'error' => "This user doesn't belong to this topic"
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $message = new Message();
            $message->setUser($user)
                    ->setChat($chat)
                    ->setDate(new \DateTime())
                    ->setContent($content);

            $entityManager->persist($message);
            $entityManager->flush();

            return $this->json([
                'status' => 1
            ], Response::HTTP_CREATED);

        } catch (\Exception $exception) {
            return $this->json([
                'status' => 0,
                'error' => $exception->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}