import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import MainWrapper from "@/components/MainWrapper";
import { InputSearch } from "@/components/InputSearch";
import { useManagers } from "@/hooks/queries/managers";
import { Manager } from "@/types/Manager.types";
import { Loader } from "@/components/loader";

export const ManagerListPage = () => {

    const navigate = useNavigate();

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const { data: managers, isLoading: isManagersLoading } = useManagers();

    const columns: ColumnDef<Manager>[] = [
        {
            header: "Nombre",
            accessorKey: "employee_name",
            cell: (info) => info.getValue(),
        }
    ];

    const table = useReactTable({
        data: managers || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    return (
        <MainWrapper>

            <div className="w-full">
                <div className="flex items-center gap-4 py-4">
                    <Button onClick={() => navigate('/manager/new')}><Plus />Nuevo encargado</Button>
                    <InputSearch
                        placeholder="Buscar encargado..."
                        value={(table.getColumn("employee_name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("employee_name")?.setFilterValue(event.target.value)
                        }
                        className="w-80"
                    />
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
                                        className="cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-800"
                                        onClick={() => navigate(`/manager/${row.original.id}/edit`)}
                                        data-state={row.getIsSelected() && "selected"}
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
                                        {isManagersLoading ? <Loader /> : "Sin resultados."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </MainWrapper>
    );
}