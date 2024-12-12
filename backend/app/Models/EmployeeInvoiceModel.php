<?php

namespace App\Models;

use CodeIgniter\Model;

class EmployeeInvoiceModel extends Model
{

    protected $table = 'employee_invoice';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    protected $allowedFields = [
        'employee_id',
        'total_worked_minutes',
        'price_per_hour',
        'total',
        'invoice_date'
    ];

    protected $validationRules = [
        'employee_id' => 'required|is_natural_no_zero',
        'total_worked_minutes' => 'required|is_natural',
        'price_per_hour' => 'required|greater_than[0]',
        'total' => 'required|greater_than[0]',
        'invoice_date' => 'required|valid_date'
    ];

    protected $skipValidation = false;
}
