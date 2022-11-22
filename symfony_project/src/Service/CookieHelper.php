<?php

namespace App\Service;

use App\Entity\User;
use Firebase\JWT\JWT;
use Symfony\Component\HttpFoundation\Cookie;

class CookieHelper
{

    private string $mercureSecret;
    private JWTHelper $JWTHelper;

    public function __construct(string $mercureSecret, JWTHelper $JWTHelper)
    {
        $this->mercureSecret = $mercureSecret;
        $this->JWTHelper = $JWTHelper;
    }

    public function createMercureCookie(User $user): string
    {
        $jwt = $this->JWTHelper->createJWT($user);

        return Cookie::create(
            'mercureAuthorization',
            $jwt,
            new \DateTime("10 minutes"),
            '/.well-known/mercure',
            'localhost',
            true,
            true,
            false,
            Cookie::SAMESITE_STRICT
        );
    }
}