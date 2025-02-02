import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClients, fetchClient, createClient, deleteClient, updateClient } from "@/services/api";
import { Client } from "@/types/Client.types";

export const useClients = (search?: string) => {
    return useQuery({
        queryKey: ['clients', search],
        queryFn: () => fetchClients(search),
        staleTime: 1000 * 10, // 10 seconds
    });
};

export const useClient = (clientId: string) => {
    return useQuery({
        queryKey: ['client', clientId],
        queryFn: () => fetchClient(clientId),
        staleTime: 1000 * 10, // 10 seconds
        enabled: !!clientId, // Only fetch if clientId is provided
    });
}

export const useCreateClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (clientData: any) => createClient(clientData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });
};

export const useDeleteClient = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (clientId: string) => deleteClient(clientId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });
}

export const useUpdateClient = (clientId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (clientData: Client) => updateClient(clientId, clientData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            queryClient.invalidateQueries({ queryKey: ['client', clientId] });
        },
    });
}