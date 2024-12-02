<?php

namespace App\Controllers;

use App\Models\ClientModel;

class ClientController extends BaseController
{
    private $model = new ClientModel();

    public function index()
    {
        $clients = $this->model->findAll();
        return $this->response->setJSON($clients)->setStatusCode(200);
    }

    public function show($id = null)
    {
        $client = $this->model->find($id);
        if (!$client) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Client not found']);
        }
        return $this->response->setJSON($client)->setStatusCode(200);
    }

    public function store()
    {
        $data = $this->request->getJSON();
        $client = $this->model->insert($data);
        return $this->response->setJSON($client)->setStatusCode(201);
    }

    public function update()
    {
        $data = $this->request->getJSON();
        $client = $this->model->update($data->id, $data);
        return $this->response->setJSON($client)->setStatusCode(200);
    }
}