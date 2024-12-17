export interface Invoice {
    id: string;
    employee_id: string;
    total_worked_minutes: number;
    price_per_hour: number;
    total: number;
    invoice_date: string;
}