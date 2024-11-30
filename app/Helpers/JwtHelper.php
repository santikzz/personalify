<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function generateJwt($data, $secret, $expiration)
{

    $issuedAt = time();
    $expiration = $issuedAt + $expiration;

    $payload = array_merge(
        $data,
        [
            'iat' => $issuedAt,
            'exp' => $expiration,
        ]
    );

    return JWT::encode($payload, $secret, 'HS256');
}

function validateJwt($token, $secret)
{
    try {
        return JWT::decode($token, new Key($secret, 'HS256'));
    } catch (Exception $e) {
        return null;
    }
}
