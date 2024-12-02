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
import { ArrowUpDown, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"

interface EmployeeLogR {
    id: number;
    name: string;
    check_in_time: string;
    check_out_time: string;
    location: string;
}

export const EmployeeLogTable = ({ data }: { data: EmployeeLogR[] }) => {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [search, setSearch] = useState<string>("");

    const navigate = useNavigate();

    const columns: ColumnDef<EmployeeLogR>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            )
        },
        {
            // header: ({ column }) => {
            //     return (
            //         <Button
            //             variant="ghost"
            //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            //         >
            //             Fecha
            //             <ArrowUpDown />
            //         </Button>
            //     )
            // },
            header: "Fecha",
            accessorKey: "date",
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
            header: "Direccion",
            accessorKey: "location",
            cell: (row) => row.getValue(),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full">

            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Buscar cliente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                <Button onClick={() => navigate('/newclient')}><Plus />Nuevo cliente</Button>
            </div>

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
                                    className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800 ${row.getIsSelected() && "bg-blue-400 dark:bg-neutral-700"}`}
                                    onClick={() => row.toggleSelected()}
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
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguente
                    </Button>
                </div>
            </div>
        </div>
    );
}