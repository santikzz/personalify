<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use App\Models\SessionModel;

class AuthFilter implements FilterInterface
{

    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return service('response')->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }

        $token = substr($authHeader, 7);

        $sessionModel = new SessionModel();
        $session = $sessionModel->where('token', $token)
            ->where('expires_at >', date('Y-m-d H:i:s'))
            ->first();

        if (!$session) {
            return service('response')->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }

        if ($arguments && !in_array($session['user_type'], $arguments)) {
            return service('response')->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }

        $request->session = $session;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here ...
    }
}
