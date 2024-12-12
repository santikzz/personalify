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
        $invoices = $this->model->where('employee_id', $employeeId)->findAll();
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

        $data = $this->request->getJSON();
        $atttendanceIds = $data->attendance_ids;

        /*
        * Get all the atttendance records from an employee that are in the atttendanceIds array
        * and have not been billed yet.
        */
        $atttendanceRecords = $employeeAttendanceModel
            ->where('employee_id', $employeeId)
            ->whereIn('id', $atttendanceIds)
            ->where('billed', 0)
            ->findAll();

        if (empty($atttendanceRecords)) {
            return $this->response->setJSON(['message' => 'No atttendance records found'])->setStatusCode(404);
        }

        /*
        * Sum the total worked minutes from all the atttendance records,
        * and calculate the total amount to bill.
        * TOTAL = (TOTAL_WORKED_MINUTES / 60) * PRICE_PER_HOUR
        */
        $pricePerHour = 670; // test mock value
        $totalWorkedMinutes = array_sum(array_column($atttendanceRecords, 'worked_minutes'));
        $total = ($totalWorkedMinutes / 60) * $pricePerHour;

        /*
        * Create the invoice record.
        */
        $invoice = $this->model->insert([
            'employee_id' => $employeeId,
            'total_worked_minutes' => $totalWorkedMinutes,
            'price_per_hour' => $pricePerHour,
            'total' => $total,
            'invoice_date' => date('Y-m-d H:i:s')
        ]);

        if (!$invoice) {
            return $this->response->setJSON(['message' => 'Failed to create invoice'])->setStatusCode(500);
        }

        /*
        * Update the atttendance records to mark them as billed.
        */
        $employeeAttendanceModel->update($atttendanceIds, ['billed' => 1]);

        return $this->response->setJSON($invoice)->setStatusCode(201);
    }
}
