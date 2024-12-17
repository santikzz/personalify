import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEmployees, fetchEmployee, createEmployee, deleteEmployee, updateEmployee } from "@/services/api";
import { Employee } from "@/types/Employee.types";
import { EmptyObject } from "react-hook-form";

export const useEmployees = () => {
    return useQuery({
        queryKey: ['employees'],
        queryFn: () => fetchEmployees(),
        staleTime: 1000 * 10, // 10 seconds
    });
};

export const useEmployee = (employeeId: string) => {
    return useQuery({
        queryKey: ['employee', employeeId],
        queryFn: () => fetchEmployee(employeeId),
        staleTime: 1000 * 10, // 10 seconds
        enabled: !!employeeId, // Only fetch if employeeId is provided
    });
};

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (employeeData: Employee) => createEmployee(employeeData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (employeeId: string) => deleteEmployee(employeeId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });
};

export const useUpdateEmployee = (employeeId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (employeeData: Employee) => updateEmployee(employeeId, employeeData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });
}