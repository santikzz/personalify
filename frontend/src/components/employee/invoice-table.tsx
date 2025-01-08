import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileDown, FileText } from 'lucide-react'
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
                                <TableHead>Dias</TableHead>
                                <TableHead>Horas</TableHead>
                                <TableHead>$/h</TableHead>
                                <TableHead>Subtotal</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices?.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.invoice_date}</TableCell>
                                    <TableCell>{invoice.total_worked_days}</TableCell>
                                    <TableCell>{Number(invoice.total_worked_minutes) / 60} hs</TableCell>
                                    <TableCell>${invoice.price_per_hour}/h</TableCell>
                                    <TableCell>${invoice.total}</TableCell>
                                    <TableCell className="max-w-10"><Button variant='secondary'><FileDown /> Exportar PDF</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
        </>
    );
}

