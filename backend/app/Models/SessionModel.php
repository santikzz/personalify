<?php

namespace App\Models;

use CodeIgniter\Model;

class SessionModel extends Model
{

    protected $table = 'sessions';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = ['user_id', 'token', 'created_at', 'user_type', 'expires_at'];

    // protected $validationRules = [
    //     'user_id' => 'required|is_natural_no_zero',
    //     'token' => 'required',
    //     'created_at' => 'required',
    //     'expires_at' => 'required',
    // ];

    // protected $skipValidation = false;
}
