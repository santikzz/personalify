<?php

namespace App\Controllers;

use App\Models\EmployeeAttendanceModel;
use App\Models\EmployeeModel;
use App\Models\ManagerModel;

class ManagerController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new ManagerModel();
    }

    public function self()
    {
        $user_id = $this->request->session['user_id'];
        $attendanceModel = new EmployeeAttendanceModel();

        $user = $this->model
            ->select('employee.name, manager.id, manager.employee_id, manager.username')
            ->join('employee', 'employee.id = manager.employee_id', 'left')
            ->find($user_id);

        if (!$user) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'User not found']);
        }

        $lastShift = $attendanceModel
            ->select('client.name as client_name, employee_attendance.check_in_time')
            ->join('client', 'client.id = employee_attendance.client_id', 'left')
            ->where('employee_attendance.manager_id', $user_id)
            ->where('employee_attendance.check_out_time', null)
            ->find();

        if ($lastShift) {
            $user['on_shift'] = $lastShift;
        } else {
            $user['on_shift'] = null;
        }

        unset($user['password_hash']);
        unset($user['disabled']);

        return $this->response->setJSON($user)->setStatusCode(200);
    }

    public function index()
    {
        $managers = $this->model
            ->select('manager.id, manager.employee_id, manager.username, manager.disabled, employee.name as employee_name')
            ->join('employee', 'employee.id = manager.employee_id', 'left')
            ->findAll();
        return $this->response->setJSON($managers)->setStatusCode(200);
    }

    public function show($managerId = null)
    {
        $manager = $this->model
            ->select('manager.*, employee.name as employee_name')
            ->join('employee', 'employee.id = manager.employee_id', 'left')
            // ->where('manager.employee_id', $managerId)
            ->find($managerId);
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
        try {
            $data = $this->request->getJSON();
            if (isset($data->password)) {
                if (!(is_null($data->password) && empty($data->password))) {
                    $data->password_hash = password_hash($data->password, PASSWORD_DEFAULT);
                }
                unset($data->password);
            }

            $manager = $this->model->update($managerId, $data);

            return $this->response->setJSON($manager)->setStatusCode(200);
        } catch (\Exception $e) {
            return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }

    public function delete($managerId = null)
    {
        $manager = $this->model->delete($managerId);
        return $this->response->setJSON($manager)->setStatusCode(200);
    }

    // public function log()
    // {
    //     $attendanceModel = new EmployeeAttendanceModel();
    //     $user_id = $this->request->session['user_id'];
    //     $current_date = date('Y-m-d');

    //     $attendances = $attendanceModel
    //         ->select('employee_attendance.*, employee.name as employee_name, client.name as client_name')
    //         ->join('employee', 'employee.id = employee_attendance.employee_id', 'left')
    //         ->join('client', 'client.id = employee_attendance.client_id', 'left')
    //         ->where('employee_attendance.manager_id', $user_id)
    //         ->where('employee_attendance.date', $current_date)
    //         ->findAll();

    //     return $this->response->setJSON($attendances)->setStatusCode(200);
    // }

    // public function checkin()
    // {
    //     try {
    //         $attendanceModel = new EmployeeAttendanceModel();
    //         $user_id = $this->request->session['user_id'];
    //         $data = $this->request->getJSON();
    //         $currentTime = date('Y-m-d');

    //         $existingAttendance = $attendanceModel
    //             ->where('manager_id', $user_id)
    //             ->where('employee_id', $data->employee_id)
    //             ->where('date', $currentTime)
    //             ->where('check_out_time', null)
    //             ->find();

    //         if ($existingAttendance) {
    //             return $this->response->setJSON(['message' => 'Employee already checked in'])->setStatusCode(400);
    //         }

    //         // 

    //         $attendance = $attendanceModel->insert([
    //             'employee_id' => $data->employee_id,
    //             'max_work_minutes' => $data->max_work_minutes,
    //             'date' => $data->date,
    //             'check_in_time' => $data->check_in_time,
    //             // 'check_out_time' => null, // default null
    //             // 'worked_minutes' => null, // default null
    //             'manager_id' => $user_id,
    //             'client_id' => $data->client_id,
    //         ]);

    //         return $this->response->setJSON($attendance)->setStatusCode(200);
    //     } catch (\Exception $e) {
    //         return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
    //     }
    // }

    // public function checkout()
    // {
    //     try {
    //         $attendanceModel = new EmployeeAttendanceModel();
    //         $user_id = $this->request->session['user_id'];
    //         $data = $this->request->getJSON();

    //         $_attendance = $attendanceModel
    //             ->select('id, check_in_time')
    //             ->where('manager_id', $user_id)
    //             ->where('employee_id', $data->employee_id)
    //             ->where('check_out_time', null)
    //             ->find();

    //         if (!$_attendance) {
    //             return $this->response->setJSON(['message' => 'Attendance not found'])->setStatusCode(404);
    //         }

    //         $_attendance = $_attendance[0]; // idk why it returns an array
    //         $currentTime = date('Y-m-d H:i:s');
    //         $workedMinutes = (int)round((strtotime($currentTime) - strtotime($_attendance['check_in_time'])) / 60);

    //         try {
    //             $attendance = $attendanceModel->update(
    //                 $_attendance['id'],
    //                 [
    //                     'check_out_time' => $currentTime,
    //                     'worked_minutes' => $workedMinutes,
    //                 ]
    //             );
    //             return $this->response->setJSON($attendance)->setStatusCode(200);
    //         } catch (\Exception $e) {
    //             return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
    //         }
    //     } catch (\Exception $e) {
    //         return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
    //     }
    // }
}
