<?php

namespace App\Controllers;

use App\Models\AdministratorModel;

class AdministratorController extends BaseController
{
    // private $model = new AdministratorModel();

    public function login()
    {
        return view('login');
    }

}
