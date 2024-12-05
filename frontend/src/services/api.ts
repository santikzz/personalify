import { AdministratorCredentials } from '@/types/Api.types';
import axios from 'axios';

const API_URL: string = 'http://localhost:8080';

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
export const fetchEmployees = async (search?: string) => {
    const endpoint: string = '/api/admin/employees';
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

export const fetchEmployee = async (employeeId: string) => {
    const response = await axiosApi.get(`/api/admin/employees/${employeeId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const createEmployee = async (employeeData: any) => {
    const response = await axiosApi.post('/api/admin/employees', employeeData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

export const updateEmployee = async (employeeId: string, employeeData: any) => {
    const response = await axiosApi.put(`/api/admin/employees/${employeeId}`, employeeData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

/*
 * ================ CLIENTS ENDPOINTS ================
*/
export const fetchClients = async (search: string) => {
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

export const createClient = async (clientData: any) => {
    const response = await axiosApi.post('/api/admin/clients', clientData);
    if (response.status === 201) {
        return response.data;
    }
    return null;
}

export const updateClient = async (clientId: string, clientData: any) => {
    const response = await axiosApi.put(`/api/admin/clients/${clientId}`, clientData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}