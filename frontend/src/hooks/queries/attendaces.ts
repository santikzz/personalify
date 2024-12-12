import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAttendances } from "@/services/api";

export const useAttendances = (employeeId: string) => {
    return useQuery({
        queryKey: ['attendances', employeeId],
        queryFn: () => fetchAttendances(employeeId),
        staleTime: 1000 * 10, // 10 seconds
    });
};
