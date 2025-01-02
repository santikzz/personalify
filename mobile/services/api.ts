
import { ManagerCredentials } from '@/types/Api.types';
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
export const authenticate = async (userdata: ManagerCredentials) => {
    const response = await axiosApi.post('/api/manager/login', userdata);
    console.log(response.data);
    if (response.status === 200) {
        const { token } = response.data;
        return token;
    }
    return false;
}

/*
 * ================ EMPLOYEES ENDPOINTS ================
*/
export const fetchEmployees = async (search?: string) => {
    const query = search ? `?q=${search}` : '';
    const response = await axiosApi.get(`/api/manager/employees${query}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const fetchEmployee = async (employeeId: string) => {
    const response = await axiosApi.get(`/api/manager/employee/${employeeId}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const fetchEmployeeByDni = async (dni: string) => {
    const response = await axiosApi.get(`/api/manager/employee/dni/${dni}`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

/*
 * ================ CLIENTS ENDPOINTS ================
*/
export const fetchClients = async () => {
    const response = await axiosApi.get(`/api/manager/clients`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

/*
 * ================ MANAGER ENDPOINTS ================
*/
export const fetchSelf = async () => {
    const response = await axiosApi.get(`/api/manager/self`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const fetchLog = async () => {
    const response = await axiosApi.get(`/api/manager/log`);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const checkIn = async ({ checkInData }: any) => {
    console.log(checkInData);
    const response = await axiosApi.post(`/api/manager/checkin`, checkInData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}

export const checkOut = async ({ checkOutData }: any) => {
    const response = await axiosApi.post(`/api/manager/checkout`, checkOutData);
    if (response.status === 200) {
        return response.data;
    }
    return null;
}