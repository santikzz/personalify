import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchEmployees, fetchEmployee, createEmployee } from "@/services/api";

export const useEmployees = (search?: string) => {
    return useQuery({
        queryKey: ['employees', search],
        queryFn: () => fetchEmployees(search),
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
        mutationFn: (employeeData: any) => createEmployee(employeeData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });
};