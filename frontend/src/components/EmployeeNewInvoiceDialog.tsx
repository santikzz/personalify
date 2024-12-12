import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ReceiptText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { createInvoice } from "@/services/api";

export const EmployeeNewInvoiceDialog = ({ employee, days }: any) => {

    const price_per_hour = 1000;
    const totalWorkedMinutes = days.reduce((acc: number, day: any) => acc + Number(day.worked_minutes), 0);
    const subtotal = totalWorkedMinutes / 60 * price_per_hour;

    const handleCreateInvoice = async () => {
        const attendaces = { attendance_ids: days.map((day: any) => day.id) };
        const response = await createInvoice(employee.id, attendaces);
        console.log(response);
    }

    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button className=""><ReceiptText />Nueva facturacion</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Nueva facturacion</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">

                    <Label className="text-base">Empleado: {employee?.name}</Label>
                    <Label className="text-base">Precio por hora: ${price_per_hour}/hr</Label>

                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Horas</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {days.map((day) => (
                                <TableRow key={day.id}>
                                    <TableCell className="font-medium">{day.date}</TableCell>
                                    <TableCell>{day.worked_minutes / 60} hs</TableCell>
                                    <TableCell className="text-right">$ {day.worked_minutes / 60 * price_per_hour}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-neutral-200 ">
                                <TableCell className="font-bold" colSpan={1}>Subtotal</TableCell>
                                <TableCell className="font-bold">{totalWorkedMinutes / 60} hs</TableCell>
                                <TableCell className="font-bold text-right">$ {subtotal}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>

                </div>

                <DialogFooter>
                    <Button onClick={handleCreateInvoice}>Crear facturacion</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>



    );
}