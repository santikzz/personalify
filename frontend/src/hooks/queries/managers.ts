import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createManager, deleteManager, fetchManager, fetchManagers, updateManager } from "@/services/api";
import { Manager, ManagerFormData } from "@/types/Manager.types";

export const useManagers = () => {
    return useQuery({
        queryKey: ['managers'],
        queryFn: () => fetchManagers(),
        staleTime: 1000 * 10, // 10 seconds
    });
}

export const useManager = (managerId: string) => {
    return useQuery({
        queryKey: ['manager', managerId],
        queryFn: () => fetchManager(managerId),
        staleTime: 1000 * 10, // 10 seconds
        enabled: !!managerId, // Only fetch if managerId is provided
    });
};

export const useCreateManager = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (employeeData: ManagerFormData) => createManager(employeeData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['managers'] });
        },
    });
};

export const useDeleteManager = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (managerId: string) => deleteManager(managerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['managers'] });
        },
    });
};

export const useUpdateManager = (managerId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (employeeData: ManagerFormData) => updateManager(managerId, employeeData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['managers'] });
        },
    });
}