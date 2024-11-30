<?php

namespace App\Controllers;

use App\Models\EmployeeModel;

class EmployeeController extends BaseController
{
    private $model = new EmployeeModel();

    public function index()
    {
        $employees = $this->model->findAll();
        return $this->response->setJSON($employees)->setStatusCode(200);
    }

    public function show($id = null)
    {
        $employee = $this->model->find($id);
        if (!$employee) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Employee not found']);
        }
        return $this->response->setJSON($employee)->setStatusCode(200);
    }

    public function store()
    {
        $data = $this->request->getJSON();
        $employee = $this->model->insert($data);
        return $this->response->setJSON($employee)->setStatusCode(201);
    }

    public function update()
    {
        $data = $this->request->getJSON();
        $employee = $this->model->update($data->id, $data);
        return $this->response->setJSON($employee)->setStatusCode(200);
    }
}
