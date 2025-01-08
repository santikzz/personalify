<?php

namespace App\Controllers;

use App\Models\EmployeeInvoiceModel;
use App\Models\EmployeeAttendanceModel;

class EmployeeInvoiceController extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new EmployeeInvoiceModel();
    }

    public function index()
    {
        $invoices = $this->model->findAll();
        return $this->response->setJSON($invoices)->setStatusCode(200);
    }

    public function show($id = null)
    {
        $invoice = $this->model->find($id);
        if (!$invoice) {
            return $this->response->setStatusCode(404)->setJSON(['message' => 'Invoice not found']);
        }
        return $this->response->setJSON($invoice)->setStatusCode(200);
    }

    public function showByEmployee($employeeId = null)
    {
        // $invoices = $this->model->where('employee_id', $employeeId)->findAll();

        $invoices = $this->model
            ->select('employee_invoice.*,   
            COUNT(employee_attendance.id) as total_worked_days,')
            ->join('employee_attendance', 'employee_attendance.invoice_id = employee_invoice.id', 'left')
            ->groupBy('employee_invoice.id')
            ->where('employee_invoice.employee_id', $employeeId)
            ->findAll();

        return $this->response->setJSON($invoices)->setStatusCode(200);
    }

    /*
    * @description: Create an invoice for an employee based on the worked days.
    * @method: POST
    * @format: JSON
    * @param employee_id: int
    * @param atttendance_ids: array (a list of employee_attendance ids "worked days" to bill)
    * @return JSON
    */
    public function store($employeeId = null)
    {
        $employeeAttendanceModel = new EmployeeAttendanceModel();

        try {

            $data = $this->request->getJSON();
            $attendanceIds = $data->attendance_ids;

            // Start a transaction
            $db = \Config\Database::connect();
            $db->transStart();

            /*
            * Get all the atttendance records from an employee that are in the attendanceIds array
            * and have not been billed yet.
            */
            $attendanceRecords = $employeeAttendanceModel
                ->where('employee_id', $employeeId)
                ->whereIn('id', $attendanceIds)
                // ->where('billed', 0)
                ->findAll();

            if (empty($attendanceRecords)) {
                return $this->response->setJSON(['message' => 'No attendance records found'])->setStatusCode(404);
            }

            /*
            * Sum the total worked minutes from all the atttendance records,
            * and calculate the total amount to bill.
            * TOTAL = (TOTAL_WORKED_MINUTES / 60) * PRICE_PER_HOUR
            */
            // $pricePerHour = 1000; // test mock value
            $totalWorkedMinutes = array_sum(array_column($attendanceRecords, 'worked_minutes'));
            // $total = round(($totalWorkedMinutes / 60), 2) * $pricePerHour;

            /*
            * Create the invoice record.
            */
            $invoice = $this->model->insert([
                'employee_id' => $employeeId,
                'total_worked_minutes' => $totalWorkedMinutes,
                'price_per_hour' => $data->pricePerHour,
                'total' => $data->subtotal,
                'invoice_date' => date('Y-m-d H:i:s')
            ]);

            if (!$invoice) {
                return $this->response->setJSON(['message' => 'Failed to create invoice'])->setStatusCode(500);
            }

            /*
            * Update the atttendance records to mark them as billed.
            */
            $employeeAttendanceModel->update($attendanceIds, ['billed' => 1, 'invoice_id' => $invoice]);
            $db->transCommit();
            return $this->response->setJSON($invoice)->setStatusCode(201);
        } catch (\Exception $e) {
            // Rollback transaction if something fails
            $db->transRollback();
            return $this->response->setJSON(['message' => $e->getMessage()])->setStatusCode(500);
        }
    }
}
