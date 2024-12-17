import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText } from 'lucide-react'
import { Employee } from "@/types/Employee.types"
import { useInvoices } from "@/hooks/queries/invoices"
import { Loader } from "../loader"

export function InvoiceTable({ employee }: { employee: Employee }) {

    const { data: invoices, isLoading } = useInvoices(employee?.id);

    return (
        <>
            {isLoading ?
                <div className="p-4 flex justify-center items-center">
                    < Loader />
                </div>
                : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Horas</TableHead>
                                <TableHead>$/h</TableHead>
                                <TableHead>Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices?.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.invoice_date}</TableCell>
                                    <TableCell>{Number(invoice.total_worked_minutes) / 60}</TableCell>
                                    <TableCell>${invoice.price_per_hour}/h</TableCell>
                                    <TableCell>${invoice.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
        </>
    );
}

