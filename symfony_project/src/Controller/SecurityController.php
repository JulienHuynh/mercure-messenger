<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\CookieHelper;
use App\Service\JWTHelper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(JWTHelper $helper, HubInterface $hub, CookieHelper $cookieHelper): Response
    {
        /** @var $user User */
        if ($user = $this->getUser()) {

            /*
             * Update est privé donc le destinataire doit avoir subscribe aux deux
             * topics pour pouvoir y accéder, et l'un deux est souscrit dans le JWT
             * ... sécurité
             */
//            $update = new Update(
//                [
//                    "https://example.com/my-private-topic",
//                    "https://example.com/user/{$user->getId()}/?topic=" . urlencode("https://example.com/my-private-topic")
//                ],
//                json_encode([
//                    'username' => $user->getUsername(),
//                    'userId' => $user->getId(),
//                    'JWT' => $helper->createJWT($user)
//                ]),
//                true
//            );
//            $hub->publish($update);

            return $this->json([
                'JWT' => $helper->createJWT($user)
            ], 200, [
                'set-cookie' => $cookieHelper->createMercureCookie($user)
            ]);
        }

//        $update = new Update(
//            'https://example.com/my-private-topic',
//            json_encode([
//                'message' => 'A bad credentials exceptions was triggered'
//            ])
//        );
//        $hub->publish($update);

        return $this->json([
            'message' => 'Bad credentials',
            'Authorization' => 'Basic'
        ]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
