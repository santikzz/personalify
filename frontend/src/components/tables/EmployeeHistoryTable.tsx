import { useEffect, useState } from "react";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Adjust imports for ShadCN components
import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeLogRow } from "@/types/Employee.types";

/*
* This table is used in the /employee/:id page to display 
* the history of an employee and their check-in and check-out times
*/
export const EmployeeHistoryTable = ({ data }: { data: EmployeeLogRow[] }) => {

    const [selectedRows, setSelectedRows] = useState<EmployeeLogRow[]>([]);

    const columns: ColumnDef<EmployeeLogRow>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => {
                        const newSelected = value ? data.filter((row) => !row.is_paid) : [];
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
                        if (!row.original.is_paid) {
                            row.toggleSelected(!!value)
                            const updatedSelectedRows = value ? [...selectedRows, row.original] : selectedRows.filter((r) => r.id !== row.original.id);
                            setSelectedRows(updatedSelectedRows);
                        }
                    }}
                    aria-label="Select row"
                    disabled={row.original.is_paid}
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: "Nombre",
            accessorKey: "name",
            cell: (row) => row.getValue(),
        },
        {
            header: "Entrada",
            accessorKey: "check_in_time",
            cell: (row) => row.getValue(),
        },
        {
            header: "Salida",
            accessorKey: "check_out_time",
            cell: (row) => row.getValue(),
        },
        {
            header: "Horas totales",
            accessorKey: "total_hours",
            cell: (row) => row.getValue(),
        },
        {
            header: "Gerente",
            accessorKey: "manager",
            cell: (row) => row.getValue(),
        },
        {
            header: "Direccion",
            accessorKey: "location",
            cell: (row) => row.getValue(),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        console.log(selectedRows);
    }, [selectedRows])

    return (
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
                                    className={`
                                        cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 
                                        ${row.original.is_paid && 'bg-green-300'}
                                        ${row.getIsSelected() && 'bg-blue-300'}
                                    `}
                                    onClick={() => {
                                        if (row.original.is_paid) return;
                                        row.toggleSelected();
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
    );
}