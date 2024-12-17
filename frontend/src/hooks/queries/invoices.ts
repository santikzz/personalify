import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInvoices } from "@/services/api";

export const useInvoices = (employeeId: string) => {
    return useQuery({
        queryKey: ['invoices', employeeId],
        queryFn: () => fetchInvoices(employeeId),
        staleTime: 1000 * 10, // 10 seconds
    });
};
