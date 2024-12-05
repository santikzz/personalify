import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClients, fetchClient, createClient } from "@/services/api";

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