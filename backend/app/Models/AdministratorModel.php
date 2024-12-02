<?php

namespace App\Models;

use CodeIgniter\Model;

class AdministratorModel extends Model
{

    public $sessionAlias = 'administrator'; // for user type session isolation
    protected $table = 'administrator';

    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = ['name', 'email', 'password_hash', 'is_super', 'disabled'];

    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[64]',
        'email' => 'required|valid_email|is_unique[administrator.email]',
        'password_hash' => 'required|min_length[8]',
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
