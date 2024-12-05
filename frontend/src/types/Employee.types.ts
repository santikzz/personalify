
export interface Employee {
    id: number;
    name: string;
    qr_code: string;
    created_at: string;
}

export interface EmployeeRow {
    id: number;
    name: string;
    dni: string;
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

/*
* used in EmployeeHistoryTable in the EmployeePage /employee/:id
*/
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

