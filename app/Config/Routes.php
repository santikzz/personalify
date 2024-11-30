<?php

use App\Controllers\AuthController;
use App\Controllers\EmployeeController;
use CodeIgniter\Router\RouteCollection;
use App\Filters\AuthFilter;

/**
 * @var RouteCollection $routes
 */

$routes->get('/', 'Home::index');

$routes->group('api',  function ($routes) {

    $routes->get('health', function () {
        return 'OK';
    });

    $routes->post('admin/register', 'AuthController::registerAdministrator');
    $routes->post('admin/login', 'AuthController::administratorLogin');
    $routes->post('manager/register', 'AuthController::reigsterManager');
    $routes->post('manager/login', 'AuthController::managerLogin');

    $routes->group('admin', ['filter' => 'authfilter:administrator'], function ($routes) {
        // administrator routes..
        $routes->get('test', function() { return "YOU ARE AN ADMIN!"; });
    });

    $routes->group('manager', ['filter' => 'authfilter:manager'], function ($routes) {
        // manager routes..
        $routes->get('test', function() { return "YOU ARE A MANAGER!"; });
    });

    $routes->group('*', ['filter' => AuthFilter::class], function ($routes) {

        $routes->get('employee', EmployeeController::class . '::index');
        $routes->post('employee', EmployeeController::class . '::store');
        $routes->put('employee', EmployeeController::class . '::update');
        // $routes->delete('employee', 'EmployeeController::delete');

    });

});
