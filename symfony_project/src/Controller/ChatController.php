<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ChatRepository;
use http\Env\Request;
use phpDocumentor\Reflection\Types\Integer;
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
}