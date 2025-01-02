import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEmployee, fetchEmployeeByDni, fetchEmployees } from "@/services/api";

export const useEmployees = (search?: string) => {
    return useQuery({
        queryKey: ['employees', search],
        queryFn: () => fetchEmployees(search),
        staleTime: 1000 * 10, // 10 seconds
    });
}

export const useEmployee = (employeeId: string) => {
    return useQuery({
        queryKey: ['employee', employeeId],
        queryFn: () => fetchEmployee(employeeId),
        staleTime: 1000 * 10, // 10 seconds
        enabled: !!employeeId, // Only fetch if dni is provided
    });
}

export const useEmployeesByDni = (dni: string) => {
    return useQuery({
        queryKey: ['employee', dni],
        queryFn: () => fetchEmployeeByDni(dni),
        staleTime: 1000 * 10, // 10 seconds
        enabled: !!dni, // Only fetch if dni is provided
    });
}