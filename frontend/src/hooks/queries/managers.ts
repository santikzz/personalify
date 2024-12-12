import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchManagers } from "@/services/api";

export const useManagers = () => {
    return useQuery({
        queryKey: ['managers'],
        queryFn: () => fetchManagers(),
        staleTime: 1000 * 10, // 10 seconds
    });
}