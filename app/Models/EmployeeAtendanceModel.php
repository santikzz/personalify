<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeeAtendanceModel extends Model
{

    protected $table = 'employee_atendance';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = ['employee_id', 'date', 'max_hours', 'check_in_time', 'check_out_time', 'manager_id', 'client_id'];

    protected $validationRules = [
        'employee_id' => 'required|is_natural_no_zero',
        'date' => 'required|valid_date[Y-m-d]',
        'max_hours' => 'required|is_natural_no_zero',
        'check_in_time' => 'required|regex_match[/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/]',              // HH:MM:SS
        'check_out_time' => 'permit_empty|regex_match[/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/]',         // HH:MM:SS
        'manager_id' => 'required|is_natural_no_zero',
        'client_id' => 'required|is_natural_no_zero',
    ];

    protected $skipValidation = false;

}
