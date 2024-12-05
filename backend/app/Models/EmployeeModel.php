<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeeModel extends Model
{

    protected $table = 'employee';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = ['name', 'qr_code'];

    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[64]',
        'qr_code' => 'required|is_unique[employee.qr_code]',
    ];

    protected $skipValidation = false;
}
