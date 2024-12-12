<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */


/**
 * Group routes for API endpoints - /api
 */
$routes->group('api', function ($routes) {

    $routes->get('health', function () {
        return 'OK';
    });

    $routes->post('admin/register', 'AuthController::registerAdministrator');
    $routes->post('admin/login', 'AuthController::administratorLogin');
    $routes->post('manager/register', 'AuthController::reigsterManager');
    $routes->post('manager/login', 'AuthController::managerLogin');

    /**
     * Group routes for administrators - /api/admin
     */
    $routes->group('admin', ['filter' => 'authfilter:administrator'], function ($routes) {

        $routes->get('self', 'AdministratorController::self');                                                      // Get current authenticated user data

        $routes->get('employees', 'EmployeeController::index');                                                     // Get all employees
        $routes->get('employees/(:num)', 'EmployeeController::show/$1');                                            // Get employee by id 
        $routes->post('employees', 'EmployeeController::store');                                                    // Create new employee
        $routes->put('employees/(:num)', 'EmployeeController::update/$1');                                          // Update employee
        $routes->delete('employees/(:num)', 'EmployeeController::delete/$1');                                       // Delete employee by id

        $routes->get('employees/(:num)/invoices', 'EmployeeInvoiceController::showByEmployee/$1');                  // Get all invoices for an employee
        $routes->post('employees/(:num)/invoices', 'EmployeeInvoiceController::store/$1');                          // Create new invoice for an employee        
        $routes->get('employees/(:num)/attendance', 'EmployeeAttendanceController::showByEmployee/$1');             // Get all atttendance records for an employee
        $routes->post('employees/(:num)/attendance', 'EmployeeAttendanceController::store/$1');                     // (TEST) Create new atttendance record for an employee, delete later

        $routes->get('managers', 'ManagerController::index');                                                       // Get all managers
        $routes->get('managers/(:num)', 'ManagerController::show/$1');                                              // Get manager by id
        $routes->post('managers', 'ManagerController::store');                                                      // Create new manager
        $routes->put('managers/(:num)', 'ManagerController::update/$1');                                            // Update manager
        $routes->delete('managers/(:num)', 'ManagerController::delete/$1');                                         // Delete manager by id

        $routes->get('invoices', 'EmployeeInvoiceController::index');                                               // Get all invoices                  
        $routes->get('invoices/(:num)', 'EmployeeInvoiceController::show/$1');                                      // Get invoice by id

        $routes->get('clients', 'ClientController::index');                                                         // Get all clients
        $routes->get('clients/(:num)', 'ClientController::show/$1');                                                // Get client by id
        $routes->post('clients', 'ClientController::store');                                                        // Create new client
        $routes->put('clients/(:num)', 'ClientController::update/$1');                                                        // Update client
        $routes->delete('clients/(:num)', 'ClientController::delete/$1');                                           // Delete client by id

    });

    /**
     * Group routes for managers - /api/manager
     */
    $routes->group('manager', ['filter' => 'authfilter:manager'], function ($routes) {
        $routes->get('test', function () {
            return "YOU ARE A MANAGER!";
        });
    });
});
