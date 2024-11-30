<?php

use App\Controllers\AuthController;
use App\Controllers\EmployeeController;
use CodeIgniter\Router\RouteCollection;
use App\Filters\AuthFilter;

/**
 * @var RouteCollection $routes
 */

$routes->get('login', 'AdministratorController::login');

/**
 * Group routes for API endpoints
 */
$routes->group('api',  function ($routes) {

    $routes->get('health', function () {
        return 'OK';
    });

    $routes->post('admin/register', 'AuthController::registerAdministrator');
    $routes->post('admin/login', 'AuthController::administratorLogin');
    $routes->post('manager/register', 'AuthController::reigsterManager');
    $routes->post('manager/login', 'AuthController::managerLogin');

    /**
     * Group routes for administrators
     */
    $routes->group('admin', ['filter' => 'authfilter:administrator'], function ($routes) {
        $routes->get('test', function () {
            return "YOU ARE AN ADMIN!";
        });
    });

    /**
     * Group routes for managers
     */
    $routes->group('manager', ['filter' => 'authfilter:manager'], function ($routes) {
        $routes->get('test', function () {
            return "YOU ARE A MANAGER!";
        });
    });
});
