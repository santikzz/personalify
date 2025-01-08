<?php

namespace App\Controllers;

use App\Models\EmployeeAttendanceModel;
use App\Models\EmployeeModel;

class EmployeeController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new EmployeeModel();
    }

    public function index()
    {
        $search = $this->request->getGet('q');
        if ($search) {
            $employees = $this->model
                ->groupStart()
                ->like('name', $search)
                ->orLike('dni', $search)
                ->groupEnd()
                ->findAll();
        } else {
            $employees = $this->model->findAll();
        }

        return $this->response->setJSON($employees)->setStatusCode(200);
    }

    public function show($id = null)
    {
        $employee = $this->model->find($id);
        if (!$employee) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Employee not found']);
        }

        $attendanceModel = new EmployeeAttendanceModel();
        $lastShift = $attendanceModel
            ->select('client.name as client_name, employee_attendance.check_in_time')
            ->join('client', 'client.id = employee_attendance.client_id', 'left')
            ->where('employee_attendance.employee_id', $id)
            ->where('employee_attendance.check_out_time', null)
            ->find();

        $employee['on_shift'] = null;
        if ($lastShift) {
            $employee['on_shift'] = $lastShift[0];
        }
        return $this->response->setJSON($employee)->setStatusCode(200);
    }

    public function showByDni($dni = null)
    {
        $employee = $this->model->where('dni', $dni)->find();
        if (!$employee) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Employee not found']);
        }
        return $this->response->setJSON($employee[0])->setStatusCode(200);
    }

    public function store()
    {
        $data = $this->request->getJSON();
        $employee = $this->model->insert($data);
        return $this->response->setJSON($employee)->setStatusCode(201);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON();
        $employee = $this->model->update($id, $data);
        return $this->response->setJSON($employee)->setStatusCode(200);
    }

    public function delete($id = null)
    {
        $employee = $this->model->delete($id);
        return $this->response->setJSON($employee)->setStatusCode(200);
    }
}
