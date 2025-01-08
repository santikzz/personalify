import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useAlertDialog } from "./useAlertDialog";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { sub } from "date-fns";
import { useCreateInvoice } from "@/hooks/queries/invoices";

export const EmployeeNewInvoiceDialog = ({ employee, days, disabled = false }: any) => {

    const { mutate: createInvoice, isSuccess, isError } = useCreateInvoice(employee?.id);

    const { showDialog, AlertDialogComponent } = useAlertDialog();
    const navigate = useNavigate();

    const price_per_hour = 1000;
    const totalWorkedHours = Math.round(days.reduce((acc: number, day: any) => acc + Number(day.total_hours), 0));

    const [subtotal, setSubtotal] = useState<number>(totalWorkedHours * price_per_hour);

    const handleCreateInvoice = async () => {
        const data = {
            subtotal: subtotal,
            pricePerHour: price_per_hour,
            attendance_ids: days.map((day: any) => day.id),
        }
        // const attendaces = { attendance_ids: days.map((day: any) => day.id) };
        await createInvoice(data);
    }

    useEffect(() => {
        setSubtotal(totalWorkedHours * price_per_hour);
    }, [employee, days, disabled]);

    useEffect(() => {
        if (isSuccess)
            showDialog({ title: "Facturacion creada", description: "Facturacion creada exitosamente", actionText: "Cerrar", onAction: () => { navigate(`/employee/${employee?.id}`) } });
        if (isError)
            showDialog({ title: "Error", description: "Error creando facturacion", actionText: "Cerrar", onAction: () => { navigate(`/employee/${employee?.id}`) } });
    }, [isSuccess, isError]);

    return (
        <>
            <AlertDialogComponent />
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={disabled}><Plus />Nueva facturacion</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nueva facturacion</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">

                        <Label className="text-base">Empleado: {employee?.name}</Label>
                        <Label className="text-base">Precio por hora: ${price_per_hour}/hr</Label>

                        <Table>
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
                                        <TableCell>{day.total_hours} hs</TableCell>
                                        <TableCell className="text-right">$ {day.total_hours * price_per_hour}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow className="bg-neutral-200 ">
                                    <TableCell className="font-bold" colSpan={1}>Subtotal</TableCell>
                                    <TableCell className="font-bold">{totalWorkedHours} hs</TableCell>
                                    <TableCell className="font-bold text-right">

                                        <div className="flex flex-row justify-end items-center gap-2">
                                            <Label>$</Label>
                                            <Input
                                                type="number"
                                                value={subtotal}
                                                className="bg-white text-right max-h-8 max-w-32"
                                                onChange={(e) => { setSubtotal(Number(e.target.value)) }}
                                            />
                                        </div>

                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>

                    </div>

                    <DialogFooter>
                        <Button onClick={handleCreateInvoice}>Crear facturacion</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}