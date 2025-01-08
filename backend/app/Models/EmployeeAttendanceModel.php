<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeeAttendanceModel extends Model
{

    protected $table = 'employee_attendance';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = [
        'employee_id',
        'max_work_minutes',
        'date',
        'check_in_time',
        'check_out_time',
        'worked_minutes',
        'manager_id',
        'client_id',
        'billed',
        'invoice_id'
    ];

    protected $validationRules = [
        'employee_id' => 'required|is_natural_no_zero',
        'max_work_minutes' => 'required|is_natural_no_zero',
        'date' => 'required|valid_date',
        'check_in_time' => 'required|valid_date',
        'check_out_time' => 'permit_empty|valid_date',
        'worked_minutes' => 'permit_empty|is_natural',
        'manager_id' => 'required|is_natural_no_zero',
        'client_id' => 'required|is_natural_no_zero',
        'billed' => 'permit_empty|in_list[0,1]', // 0 = not billed, 1 = billed
        'invoice_id' => 'permit_empty|is_natural_no_zero'
    ];

    protected $skipValidation = false;
}
