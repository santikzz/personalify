<?php

namespace App\Models;

use CodeIgniter\Model;

class ClientModel extends Model
{

    protected $table = 'client';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = ['name'];

    protected $validationRules = [
        'name' => 'required|min_length[1]|max_length[256]',
    ];

    protected $skipValidation = false;

}
