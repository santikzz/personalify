export interface Manager {
    id: string;
    employee_id: string;
    username: string;
    disabled: string,
    employee_name: string;
}

export interface ManagerFormData {
    employee_id: string;
    username: string;
    password: string;
    disabled: string;
}