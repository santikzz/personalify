<?php

namespace App\Controllers;

use App\Models\AdministratorModel;

class AdministratorController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new AdministratorModel();
    }

    public function self()
    {
        $user_id = $this->request->session['user_id'];
        $user = $this->model->find($user_id);

        if (!$user) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'User not found']);
        }

        unset($user['password_hash']);
        unset($user['disabled']);

        return $this->response->setJSON($user)->setStatusCode(200);
    }
}
