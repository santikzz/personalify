import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Adjust imports for ShadCN components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"

import { EmployeeLogRow } from "@/types/Employee.types";

/*
* This table is used in the home page to display 
* a log of employees and their check-in and check-out times in the day
*/
export const EmployeeLogTable = ({ data }: { data: EmployeeLogRow[] }) => {

    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    const columns: ColumnDef<EmployeeLogRow>[] = [
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
        // state: { sorting },
        // onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        // getSortedRowModel: getSortedRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
    });

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
                                    className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800`}
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