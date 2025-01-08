import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice, fetchInvoiceDetails, fetchInvoices } from "@/services/api";

export const useInvoices = (employeeId: string) => {
    return useQuery({
        queryKey: ['invoices', employeeId],
        queryFn: () => fetchInvoices(employeeId),
        staleTime: 1000 * 10, // 10 seconds
    });
};

export const useInvoice = (invoiceId: string) => {
    return useQuery({
        queryKey: ['invoice', invoiceId],
        queryFn: () => fetchInvoiceDetails(invoiceId),
        staleTime: 1000 * 10, // 10 seconds
    });
}

export const useCreateInvoice = (employeeId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (invoiceData: any) => createInvoice(employeeId, invoiceData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices', employeeId] });
        },
    });
};