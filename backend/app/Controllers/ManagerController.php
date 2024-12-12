<?php

namespace App\Controllers;

use App\Models\EmployeeModel;
use App\Models\ManagerModel;

class ManagerController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new ManagerModel();
    }

    public function index()
    {
        $managers = $this->model
            ->select('manager.*, employee.name as employee_name')
            ->join('employee', 'employee.id = manager.employee_id', 'left')
            ->findAll();
        return $this->response->setJSON($managers)->setStatusCode(200);
    }

    public function show($managerId = null)
    {
        $manager = $this->model
            ->select('manager.*, employee.name as employee_name')
            ->join('employee', 'employee.id = manager.employee_id', 'left')
            ->where('manager.employee_id', $managerId)
            ->findAll();
        if (!$manager) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'manager not found']);
        }
        return $this->response->setJSON($manager)->setStatusCode(200);
    }

    public function store()
    {
        $data = $this->request->getJSON();
        $manager = $this->model->insert($data);
        return $this->response->setJSON($manager)->setStatusCode(201);
    }

    public function update($managerId = null)
    {
        $data = $this->request->getJSON();
        $manager = $this->model->update($data->managerId, $data);
        return $this->response->setJSON($manager)->setStatusCode(200);
    }

    public function delete($managerId = null)
    {
        $manager = $this->model->delete($managerId);
        return $this->response->setJSON($manager)->setStatusCode(200);
    }
}
