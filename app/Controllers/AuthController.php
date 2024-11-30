<?php

namespace App\Controllers;

use App\Models\AdministratorModel;
use App\Models\ManagerModel;
use App\Models\SessionModel;

class AuthController extends BaseController
{
    public function administratorLogin()
    {

        $data = $this->request->getJSON();
        if (empty($data->email) || empty($data->password)) {
            return $this->response->setStatusCode(400)->setJSON(['message' => 'Missing fields']);
        }

        $model = new AdministratorModel();
        $session = new SessionModel();

        $user = $model->where('email', $data->email)->first();

        if (!$user || !password_verify($data->password, $user['password_hash'])) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Invalid Username or Password']);
        }

        $token = bin2hex(random_bytes(32));
        $token = password_hash($token, PASSWORD_DEFAULT);
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

        $session->insert([
            'user_id' => $user['id'],
            'token' => $token,
            'user_type' => $model->sessionAlias,
            'expires_at' => $expiresAt,
        ]);

        return $this->response->setJSON(['token' => $token])->setStatusCode(200);
    }

    public function managerLogin()
    {
        $data = $this->request->getJSON();
        if (empty($data->username) || empty($data->password)) {
            return $this->response->setStatusCode(400)->setJSON(['message' => 'Missing fields']);
        }

        $model = new ManagerModel();
        $session = new SessionModel();

        $user = $model->where('username', $data->username)->first();
        if (!$user || !password_verify($data->password, $user['password_hash'])) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Invalid Username or Password']);
        }

        $token = bin2hex(random_bytes(32));
        $token = password_hash($token, PASSWORD_DEFAULT);
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

        $session->insert([
            'user_id' => $user['id'],
            'token' => $token,
            'user_type' => $model->sessionAlias,
            'expires_at' => $expiresAt,
        ]);

        return $this->response->setJSON(['token' => $token])->setStatusCode(200);
    }

    public function logout()
    {

        $authHeader = $this->request->getHeaderLine('Authorization');
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->response->setStatusCode(401)->setJSON(['message' => 'Unauthorized']);
        }

        $token = substr($authHeader, 7);
        $session = new SessionModel();

        $deleted = $session->where('token', password_hash($token, PASSWORD_DEFAULT))->delete();

        if (!$deleted) {
            return $this->response->setStatusCode(401)->setJSON(['message' => 'Invalid Token']);
        }

        return $this->response->setStatusCode(200)->setJSON(['message' => 'Logout Success']);
    }

    public function registerAdministrator()
    {

        $data = $this->request->getJSON();
        if (empty($data->name) || empty($data->email) || empty($data->password)) {
            return $this->response->setStatusCode(400)->setJSON(['message' => 'Missing fields']);
        }

        $model = new AdministratorModel();

        $user = $model->insert([
            'name' => $data->name,
            'email' => $data->email,
            'password_hash' => password_hash($data->password, PASSWORD_DEFAULT),
        ]);

        if (!$user) {
            return $this->response->setStatusCode(400)->setJSON(['message' => 'Register Failed']);
        }

        return $this->response->setStatusCode(201)->setJSON(['message' => 'Register Success']);
    }

    public function registerManager()
    {
        $data = $this->request->getJSON();
        if (empty($data->username) || empty($data->employee_id || empty($data->password))) {
            return $this->response->setStatusCode(400)->setJSON(['message' => 'Missing fields']);
        }

        $model = new ManagerModel();

        $model->insert([
            'username' => $data->username,
            'employee_id' => $data->employee_id,
            'password_hash' => password_hash($data->password, PASSWORD_DEFAULT),
        ]);

        return $this->response->setStatusCode(201)->setJSON(['message' => 'Register Success']);
    }
}
