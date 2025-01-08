export interface Employee {
    id: string;
    name: string;
    dni: string;
    qr_code: string;
    created_at: string;
}

export interface EmployeeAttendance {
    id: string;
    employee_id: string;
    employee_name: string;
    check_in_time: string;
    check_out_time: string;
    date: string;
    max_work_minutes: string;
    worked_minutes: string;
    billed: string;
    manager_id: string;
    manager_name: string;
    client_id: string;
    client_name: string;
    total_hours: string;
}

/*
* used in EmployeeLogTable in the HomePage
*/
export interface EmployeeLog {
    id: number;
    name: string;
    date: string;
    check_in_time: string;
    check_out_time: string;
    manager: string;
    location: string;
}

export interface EmployeeLogRow {
    id: number;
    name: string;
    date: string;
    check_in_time: string;
    check_out_time: string;
    total_hours: string;
    manager: string;
    location: string;
    is_paid: boolean;
}

