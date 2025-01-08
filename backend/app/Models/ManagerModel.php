<?php

namespace App\Models;

use CodeIgniter\Model;

class ManagerModel extends Model
{

    public $sessionAlias = 'manager'; // for user type session isolation
    protected $table = 'manager';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = ['employee_id', 'username', 'password_hash', 'disabled'];

    protected $validationRules = [
        'employee_id' => 'required|is_natural_no_zero',
        'username' => 'required|is_unique[manager.username]',
        // 'password_hash' => 'required|min_length[8]',
    ];

    protected $skipValidation = false;

    // protected $beforeInsert = ['beforeInsert'];
    // protected $beforeUpdate = ['beforeUpdate'];

    // protected function beforeInsert(array $data)
    // {
    //     $data = $this->passwordHash($data);
    //     return $data;
    // }
    // protected function beforeUpdate(array $data)
    // {
    //     $data = $this->passwordHash($data);
    //     return $data;
    // }
    // protected function passwordHash(array $data)
    // {
    //     if (isset($data['data']['password_hash']))
    //         $data['data']['password_hash'] = password_hash($data['data']['password_hash'], PASSWORD_DEFAULT);
    //     return $data;
    // }
}
