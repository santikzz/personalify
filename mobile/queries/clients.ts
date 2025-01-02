import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchClients } from "@/services/api";

export const useClients = () => {
    return useQuery({
        queryKey: ['clients'],
        queryFn: () => fetchClients(),
        staleTime: 1000 * 10, // 10 seconds
    });
};