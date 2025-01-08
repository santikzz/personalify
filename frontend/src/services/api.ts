import { AdministratorCredentials } from '@/types/Api.types';
import { Client } from '@/types/Client.types';
import { Employee } from '@/types/Employee.types';
import { Manager, ManagerFormData } from '@/types/Manager.types';
import axios from 'axios';

const API_URL: string = 'http://192.168.0.13:8080';

const axiosApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token: string | null) => {
    if (token) {
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosApi.defaults.headers.common['Authorization'];
    }
}

/*
 * ================ AUTHENTICATION ENDPOINTS ================
*/
export const authenticate = async (userdata: AdministratorCredentials) => {
    const response = await axiosApi.post('/api/admin/login', userdata);
    if (response.status === 200) {
        const { token } = response.data;
        return token;
    }
    return false;
}

/*
 * ================ ADMINISTRATORS ENDPOINTS ================
*/
export const fetchSelf = async () => {
    const response = await axiosApi.get(`/api/admin/self`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

/*
 * ================ EMPLOYEES ENDPOINTS ================
*/
export const fetchEmployees = async () => {
    const response = await axiosApi.get('/api/admin/employees');
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const fetchEmployee = async (employeeId: string) => {
    const response = await axiosApi.get(`/api/admin/employees/${employeeId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const createEmployee = async (employeeData: Employee) => {
    const response = await axiosApi.post('/api/admin/employees', employeeData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

export const updateEmployee = async (employeeId: string, employeeData: Employee) => {
    const response = await axiosApi.put(`/api/admin/employees/${employeeId}`, employeeData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const deleteEmployee = async (employeeId: string) => {
    const response = await axiosApi.delete(`/api/admin/employees/${employeeId}`);
    if (response.status === 200) {
        return true;
    }
}

export const fetchLogs = async () => {
    const response = await axiosApi.get('/api/admin/log');
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

/*
 * ================ MANAGERS ENDPOINTS ================
*/
export const fetchManagers = async () => {
    const response = await axiosApi.get('/api/admin/managers');
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const fetchManager = async (managerId: string) => {
    const response = await axiosApi.get(`/api/admin/managers/${managerId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const createManager = async (managerData: ManagerFormData) => {
    const response = await axiosApi.post('/api/admin/managers', managerData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

export const updateManager = async (managerId: string, managerData: ManagerFormData) => {
    const response = await axiosApi.put(`/api/admin/managers/${managerId}`, managerData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const deleteManager = async (managerId: string) => {
    const response = await axiosApi.delete(`/api/admin/managers/${managerId}`);
    if (response.status === 200) {
        return true;
    }
}

/*
 * ================ CLIENTS ENDPOINTS ================
*/
export const fetchClients = async (search?: string) => {
    const endpoint: string = '/api/admin/clients';
    const params = { search: '' };
    if (search) params.search = search;

    const query = new URLSearchParams(params).toString();
    const url = query ? `${endpoint}?${query}` : endpoint;

    const response = await axiosApi.get(url);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const fetchClient = async (clientId: string) => {
    const response = await axiosApi.get(`/api/admin/clients/${clientId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const createClient = async (clientData: Client) => {
    const response = await axiosApi.post('/api/admin/clients', clientData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

export const updateClient = async (clientId: string, clientData: Client) => {
    const response = await axiosApi.put(`/api/admin/clients/${clientId}`, clientData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const deleteClient = async (clientId: string) => {
    const response = await axiosApi.delete(`/api/admin/clients/${clientId}`);
    if (response.status === 200) {
        return true;
    }
}

/*
 * ================ ATTENDANCE ENDPOINTS ================
*/
export const fetchAttendances = async (employeeId: string) => {
    const response = await axiosApi.get(`/api/admin/employees/${employeeId}/attendance`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const createAttendance = async (employeeId: string, attendanceData: any) => {
    const response = await axiosApi.post(`/api/admin/employees/${employeeId}/attendance`, attendanceData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

export const updateAttendance = async (attendanceId: string, attendanceData: any) => {
    const response = await axiosApi.put(`/api/admin/attendance/${attendanceId}`, attendanceData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

/*
 * ================ INVOICES ENDPOINTS ================
*/
export const fetchInvoices = async (employeeId: string) => {
    const response = await axiosApi.get(`/api/admin/employees/${employeeId}/invoices`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const fetchInvoiceDetails = async (invoiceId: string) => {
    const response = await axiosApi.get(`/api/admin/invoices/${invoiceId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const createInvoice = async (employeeId: string, invoiceData: any) => {
    const response = await axiosApi.post(`/api/admin/employees/${employeeId}/invoices`, invoiceData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}