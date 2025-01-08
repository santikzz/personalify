import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttendance, fetchAttendances, fetchLogs, updateAttendance } from "@/services/api";

export const useAttendances = (employeeId: string) => {
    return useQuery({
        queryKey: ['attendances', employeeId],
        queryFn: () => fetchAttendances(employeeId),
        staleTime: 1000 * 10, // 10 seconds
    });
};

export const useCreateAttendance = (employeeId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (attendanceData: any) => createAttendance(employeeId, attendanceData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendances'] });
        },
    });
};

export const useUpdateAttendance = (attendanceId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (attendanceData: any) => updateAttendance(attendanceId, attendanceData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendances'] });
            queryClient.invalidateQueries({ queryKey: ['attendance', attendanceId] });
        },
    });
}

export const useLogs = () => {
    return useQuery({
        queryKey: ['logs'],
        queryFn: () => fetchLogs(),
        staleTime: 1000 * 10, // 10 seconds
    });
};
