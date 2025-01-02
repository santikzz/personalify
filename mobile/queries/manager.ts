import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIn, checkOut, fetchLog } from "@/services/api";

export const useLog = () => {
    return useQuery({
        queryKey: ['log'],
        queryFn: () => fetchLog(),
        staleTime: 1000 * 10, // 10 seconds
    });
}

export const useCheckIn = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (checkInData: any) => checkIn(checkInData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['log'] });
        },
    });
};

export const useCheckOut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (checkOutData: any) => checkOut(checkOutData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['log'] });
        },
    });
};