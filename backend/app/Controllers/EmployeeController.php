<?php

namespace App\Controllers;

use App\Models\EmployeeModel;

class EmployeeController extends BaseController
{
    public function index()
    {
        $model = new EmployeeModel();
        $employees = $model->findAll();
        return $this->response->setJSON($employees)->setStatusCode(200);
    }

    public function show($id = null)
    {
        $model = new EmployeeModel();
        $employee = $model->find($id);
        if (!$employee) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Employee not found']);
        }
        return $this->response->setJSON($employee)->setStatusCode(200);
    }

    public function store()
    {
        $model = new EmployeeModel();
        $data = $this->request->getJSON();
        $employee = $model->insert($data);
        return $this->response->setJSON($employee)->setStatusCode(201);
    }

    public function update()
    {
        $model = new EmployeeModel();
        $data = $this->request->getJSON();
        $employee = $model->update($data->id, $data);
        return $this->response->setJSON($employee)->setStatusCode(200);
    }
}
