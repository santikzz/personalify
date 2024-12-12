<?php

namespace App\Controllers;

use App\Models\EmployeeAttendanceModel;

class EmployeeAttendanceController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new EmployeeAttendanceModel();
    }

    public function index()
    {
        $attendances = $this->model->findAll();
        return $this->response->setJSON($attendances)->setStatusCode(200);
    }

    public function show($id = null)
    {
        $attendance = $this->model->find($id);
        if (!$attendance) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Attendance registry not found']);
        }
        return $this->response->setJSON($attendance)->setStatusCode(200);
    }

    /*
    * Show all attendances for a specific employee
    * with the employee name, manager name and client name
    */
    public function showByEmployee($employeeId = null)
    {
        $attendances = $this->model
            ->select('employee_attendance.*,
                employee.name AS employee_name,
                manager_employee.name AS manager_name,
                manager_employee.id AS manager_employee_id,
                client.name AS client_name')
            ->join('employee', 'employee.id = employee_attendance.employee_id', 'left')
            ->join('manager', 'manager.id = employee_attendance.manager_id', 'left')
            ->join('employee AS manager_employee', 'manager_employee.id = manager.employee_id', 'left')
            ->join('client', 'client.id = employee_attendance.client_id', 'left')
            ->where('employee_attendance.employee_id', $employeeId)
            ->findAll();

        return $this->response->setJSON($attendances)->setStatusCode(200);
    }

    public function store($employeeId = null)
    {
        $data = $this->request->getJSON();

        // get the check in time and check out time, and calculate the worked_minutes and add it to the data

        $checkInTime = new \DateTime($data->check_in_time);
        $checkOutTime = new \DateTime($data->check_out_time);
        $interval = $checkOutTime->diff($checkInTime);
        $workedMinutes = ($interval->h * 60) + $interval->i;

        $data->employee_id = $employeeId;
        $data->worked_minutes = $workedMinutes;

        $attendance = $this->model->insert($data);

        if ($attendance) {
            return $this->response->setJSON($attendance)->setStatusCode(201);
        } else {
            return $this->response->setJSON(['error' => $this->model->errors()])->setStatusCode(400);
        }
    }
    public function update()
    {
        $data = $this->request->getJSON();
        $attendance = $this->model->update($data->id, $data);
        return $this->response->setJSON($attendance)->setStatusCode(200);
    }

    public function delete($id = null)
    {
        $attendance = $this->model->delete($id);
        return $this->response->setJSON($attendance)->setStatusCode(200);
    }
}
