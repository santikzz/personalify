<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeeModel extends Model
{

    protected $table = 'sessions';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = ['user_id', 'token', 'expires_at'];

    protected $validationRules = [
        'user_id' => 'required|is_natural_no_zero',
        'token' => 'required|min_length[1]|max_length[256]',
        'expires_at' => 'required|valid_date',
    ];

    protected $skipValidation = false;
}
