import { useState } from "react";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

import { EmployeeNewAttendanceDialog } from "@/components/EmployeeNewAttendanceDialog";
import { EmployeeNewInvoiceDialog } from "@/components/EmployeeNewInvoiceDialog";
import { Employee, EmployeeAttendance } from "@/types/Employee.types";
import { useAttendances } from "@/hooks/queries/attendaces";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { EmployeeEditAttendanceDialog } from "../EmployeeEditAttendanceDialog";

export function AttendanceTable({ employee }: { employee: Employee }) {

    const [selectedRows, setSelectedRows] = useState<EmployeeAttendance[]>([]);
    const { data: attendances, isLoading: attendancesLoading } = useAttendances(employee?.id);

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
            cell: (row) => {
                if (row.getValue()) {
                    try {
                        return format(row.getValue(), 'HH:mm')
                    }
                    catch (e) {
                        return "Invalid date";
                    }
                } else {
                    return "--"
                }
            },
        },
        {
            header: "Salida",
            accessorKey: "check_out_time",
            cell: (row) => {
                if (row.getValue()) {
                    try {
                        return format(row.getValue(), 'HH:mm')
                    }
                    catch (e) {
                        return "Invalid date";
                    }
                } else {
                    return "--"
                }
            },
        },
        {
            header: "Horas totales",
            accessorKey: "total_hours",
            cell: (row) => (<>
                {row.getValue() ? `${row.getValue()} hs` : "--"}
            </>),
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
        {
            header: "",
            accessorKey: "id",
            cell: (row) => (
                <div className="flex gap-2">
                    <EmployeeEditAttendanceDialog attendance={row.row.original} disabled={row.row.original.billed == '1'} />
                </div>
            ),
        }
    ];

    const table = useReactTable({
        data: attendances || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <div className="flex gap-2 px-2 pb-2">
        

                <EmployeeNewInvoiceDialog employee={employee} days={selectedRows} disabled={selectedRows.length == 0 || attendancesLoading} />
                <EmployeeNewAttendanceDialog employee={employee} disabled={attendancesLoading} />
            </div>

            {attendancesLoading ?
                <div className="p-4 flex items-center justify-center">
                    <Loader />
                </div>
                : (
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
                                        {attendancesLoading ? 'Cargando...' : 'Sin resultados.'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
        </>
    );
}

