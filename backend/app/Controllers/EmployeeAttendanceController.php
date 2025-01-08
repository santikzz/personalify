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

        foreach ($attendances as $idx => $attendance) {
            $attendances[$idx]['total_hours'] = null;
            if ($attendance['check_out_time'] != null && $attendance['worked_minutes'] != null) {
                $attendances[$idx]['total_hours'] = round(($attendance['worked_minutes'] / 60), 2);
            }
        }

        return $this->response->setJSON($attendances)->setStatusCode(200);
    }

    public function store($employeeId = null)
    {
        $data = $this->request->getJSON();

        $checkInTime = new \DateTime($data->check_in_time);                           // get the check in time and check out time, and calculate the worked_minutes and add it to the data
        $checkOutTime = new \DateTime($data->check_out_time);
        $interval = $checkOutTime->diff($checkInTime);

        $totalWorkedMinutes = ($interval->h * 60) + $interval->i;                               // convert hours to minutes and add the minutes
        $data->max_work_minutes = $data->max_work_minutes * 60;                                 // max_work_minutes comes in hours from the frontend, so we need to convert it to minutes

        if ($totalWorkedMinutes > $data->max_work_minutes) {                                     // if the worked minutes are greater than the max_work_minutes, then set the worked minutes to the max_work_minutes
            $totalWorkedMinutes = $data->max_work_minutes;
        }

        $data->employee_id = $employeeId;
        $data->worked_minutes = $totalWorkedMinutes;

        $attendance = $this->model->insert($data);

        if ($attendance) {
            return $this->response->setJSON($attendance)->setStatusCode(201);
        } else {
            return $this->response->setJSON(['error' => $this->model->errors()])->setStatusCode(400);
        }
    }
    public function update($attendanceId = null)
    {
        try {
            $data = $this->request->getJSON();
            $data->max_work_minutes = $data->max_work_minutes * 60;
            $totalWorkedMinutes = (int)round((strtotime($data->check_out_time) - strtotime($data->check_in_time)) / 60);
            if ($totalWorkedMinutes > $data->max_work_minutes) {
                $totalWorkedMinutes = $data->max_work_minutes;
            }
            $data->worked_minutes = $totalWorkedMinutes;
            $attendance = $this->model->update($attendanceId, $data);
            return $this->response->setJSON($attendance)->setStatusCode(200);
        } catch (\Exception $e) {
            return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }

    public function delete($id = null)
    {
        $attendance = $this->model->delete($id);
        return $this->response->setJSON($attendance)->setStatusCode(200);
    }

    public function log()
    {
        $user_id = $this->request->session['user_id'];
        $current_date = date('Y-m-d');

        $attendances = $this->model->select('employee_attendance.*,
            employee.name AS employee_name,
            manager_employee.name AS manager_name,
            manager_employee.id AS manager_employee_id,
            client.name AS client_name')
            ->join('employee', 'employee.id = employee_attendance.employee_id', 'left')
            ->join('manager', 'manager.id = employee_attendance.manager_id', 'left')
            ->join('employee AS manager_employee', 'manager_employee.id = manager.employee_id', 'left')
            ->join('client', 'client.id = employee_attendance.client_id', 'left')
            ->where('employee_attendance.date', $current_date)
            ->findAll();

        return $this->response->setJSON($attendances)->setStatusCode(200);
    }

    public function checkin()
    {
        try {
            $user_id = $this->request->session['user_id'];
            $data = $this->request->getJSON();
            $currentTime = date('Y-m-d');

            $existingAttendance = $this->model
                ->where('manager_id', $user_id)
                ->where('employee_id', $data->employee_id)
                ->where('date', $currentTime)
                ->where('check_out_time', null)
                ->find();

            if ($existingAttendance) {
                return $this->response->setJSON(['message' => 'Employee already checked in'])->setStatusCode(400);
            }

            $attendance = $this->model->insert([
                'employee_id' => $data->employee_id,
                'max_work_minutes' => $data->max_work_minutes,
                'date' => $data->date,
                'check_in_time' => $data->check_in_time,
                // 'check_out_time' => null, // default null
                // 'worked_minutes' => null, // default null
                'manager_id' => $user_id,
                'client_id' => $data->client_id,
            ]);

            return $this->response->setJSON($attendance)->setStatusCode(200);
        } catch (\Exception $e) {
            return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }

    public function checkout()
    {
        try {
            $user_id = $this->request->session['user_id'];
            $data = $this->request->getJSON();

            $_attendance = $this->model
                ->select('id, check_in_time')
                ->where('manager_id', $user_id)
                ->where('employee_id', $data->employee_id)
                ->where('check_out_time', null)
                ->find();

            if (!$_attendance) {
                return $this->response->setJSON(['message' => 'Attendance not found'])->setStatusCode(404);
            }

            $_attendance = $_attendance[0]; // idk why it returns an array
            $currentTime = date('Y-m-d H:i:s');
            $workedMinutes = (int)round((strtotime($currentTime) - strtotime($_attendance['check_in_time'])) / 60);

            try {
                $attendance = $this->model->update(
                    $_attendance['id'],
                    [
                        'check_out_time' => $currentTime,
                        'worked_minutes' => $workedMinutes,
                    ]
                );
                return $this->response->setJSON($attendance)->setStatusCode(200);
            } catch (\Exception $e) {
                return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
            }
        } catch (\Exception $e) {
            return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }
}
