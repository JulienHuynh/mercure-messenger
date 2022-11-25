<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ChatRepository;
use http\Env\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class ChatController extends AbstractController
{
    #[Route('/chat/{topic}', name: 'get_chat_conversation', methods: 'GET')]
    public function getChatConversation(ChatRepository $chatRepository, HubInterface $hub, string $topic): JsonResponse
    {

        $update = new Update(
            [
                "https://example.com/my-private-topic",
                "https://example.com/chat/{$topic}/?topic=" . urlencode("https://example.com/my-private-topic")
            ],
            json_encode([
                'chat' => $chatRepository->getAllMessagesOrderByDate($topic)
            ]),
            true
        );

        $hub->publish($update);

        return $this->json([
            'message' => 'Chat sent'
        ]);
    }
}