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
        /**
         * Check if the Authorization header is present
         */
        $authHeader = $request->getHeaderLine('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return service('response')->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }

        $token = substr($authHeader, 7); // Remove 'Bearer ' from the token and get the token

        /**
         * Check if the token is present in the database and is not expired
         */
        $sessionModel = new SessionModel();
        $session = $sessionModel->where('token', $token)
            ->where('expires_at >', date('Y-m-d H:i:s'))
            ->first();

        if (!$session) {
            return service('response')->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }

        /**
         * Check if the user_type is present in the arguments and is the same as the session user_type
         */
        if ($arguments && !in_array($session['user_type'], $arguments)) {
            return service('response')->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }

        $request->session = $session; // Inject the session into the request object
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here ...
    }
}
