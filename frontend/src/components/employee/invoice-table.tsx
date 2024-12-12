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

interface Invoice {
    id: string
    date: string
    amount: number
    status: "Paid" | "Pending" | "Overdue"
}

export function InvoiceTable({ employee }: { employee: Employee }) {
    const invoices: Invoice[] = [
        { id: "INV-001", date: "2023-05-01", amount: 1000, status: "Paid" },
        { id: "INV-002", date: "2023-05-15", amount: 1200, status: "Pending" },
        { id: "INV-003", date: "2023-04-30", amount: 800, status: "Overdue" },
        { id: "INV-004", date: "2023-06-01", amount: 1500, status: "Pending" },
        { id: "INV-005", date: "2023-06-15", amount: 950, status: "Paid" },
    ]

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4 mr-2" />
                                View
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

