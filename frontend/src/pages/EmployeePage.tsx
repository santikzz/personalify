import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Adjust imports for ShadCN components
import { Checkbox } from "@/components/ui/checkbox";

import MainWrapper from "@/components/MainWrapper";
import { useAttendances } from "@/hooks/queries/attendaces";
import { useDeleteEmployee, useEmployee } from "@/hooks/queries/employees";
import { EmployeeNewAttendanceDialog } from "@/components/EmployeeNewAttendanceDialog";
import { EmployeeNewInvoiceDialog } from "@/components/EmployeeNewInvoiceDialog";
import { EmployeeAttendance } from "@/types/Employee.types";
import { format } from "date-fns";

export const EmployeePage = () => {

    const { employeeId } = useParams();
    const [selectedRows, setSelectedRows] = useState<EmployeeAttendance[]>([]);

    const { data: employee, isLoading: employeeLoading } = useEmployee(employeeId);
    // const { mutate: deleteEmployee, isLoading: deleteLoading, isSuccess, isError } = useDeleteEmployee();
    const { data: attendances, isLoading: attendancesLoading } = useAttendances(employeeId);

    useEffect(() => {
        console.log(selectedRows);
    }, [selectedRows]);

    const columns: ColumnDef<EmployeeAttendance>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => {
                        const newSelected = value ? data.filter((row) => !row.billed) : [];
                        setSelectedRows(newSelected);
                        table.toggleAllPageRowsSelected(!!value)
                    }}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        if (row.original.billed != '1') {
                            row.toggleSelected(!!value)
                            const updatedSelectedRows = value ? [...selectedRows, row.original] : selectedRows.filter((r) => r.id !== row.original.id);
                            setSelectedRows(updatedSelectedRows);
                        }
                    }}
                    aria-label="Select row"
                    disabled={row.original.billed === '1'}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: "Nombre",
            accessorKey: "employee_name",
            cell: (row) => row.getValue(),
        },
        {
            header: "Fecha",
            accessorKey: "date",
            cell: (row) => format(row.getValue(), 'dd-MM-yyyy'),
        },
        {
            header: "Entrada",
            accessorKey: "check_in_time",
            cell: (row) => format(row.getValue(), 'HH:mm'),
        },
        {
            header: "Salida",
            accessorKey: "check_out_time",
            cell: (row) => format(row.getValue(), 'HH:mm'),
        },
        {
            header: "Horas totales",
            accessorKey: "worked_minutes",
            cell: (row) => (row.getValue() / 60),
        },
        {
            header: "Gerente",
            accessorKey: "manager_name",
            cell: (row) => row.getValue(),
        },
        {
            header: "Cliente",
            accessorKey: "client_name",
            cell: (row) => row.getValue(),
        },
    ];

    const table = useReactTable({
        data: attendances || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // useEffect(() => {
    //     console.log(selectedRows);
    // }, [selectedRows]);

    return (
        <MainWrapper>
            <div className="p-4 flex-1">
                <div className="flex flex-col gap-2">
                    <Label className="text-xl font-bold">{employee?.name}</Label>
                </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
                <div className="flex gap-2">
                    <EmployeeNewInvoiceDialog employee={employee} days={selectedRows} />
                    <EmployeeNewAttendanceDialog employeeId={employee?.id} />
                </div>

                <div className="w-full">
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className={` hover:bg-neutral-200
                                                ${row.original.billed == '1' && 'bg-green-300'}
                                                ${row.getIsSelected() && 'bg-blue-300'}
                                            `}
                                            onClick={() => {
                                                // if (row.original.billed == '1') return;
                                                // row.toggleSelected();
                                            }}
                                        // data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            Sin resultados.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </div>
        </MainWrapper>
    );
}