import { useState } from "react";
import { Calendar } from "lucide-react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { format } from 'date-fns';

import MainWrapper from "@/components/MainWrapper";
import { useGlobalContext } from "@/context/GlobalContext";
import { Employee, EmployeeLog } from "@/types/Employee.types";
import { useLogs } from "@/hooks/queries/attendaces";
import { Loader } from "@/components/loader";
import { InputSearch } from "@/components/InputSearch";
import { formatDate } from "@/utils/utils";

export const HomePage = () => {

    const { user } = useGlobalContext();
    const navigate = useNavigate();

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const { data: logs, isLoading } = useLogs();

    const columns: ColumnDef<any>[] = [
        {
            header: "Empleado",
            accessorKey: "employee_name",
            cell: (row) => row.getValue(),
        },
        {
            header: "Entrada",
            accessorKey: "check_in_time",
            cell: (row) => format(row.getValue(), 'HH:mm'),
        },
        {
            header: "Salida",
            accessorKey: "check_out_time",
            cell: (row) => (<>
                {row.getValue() ? format(row.getValue(), 'HH:mm') : "--"}
            </>),
        },
        {
            header: "Gerente",
            accessorKey: "manager_name",
            cell: (row) => row.getValue(),
        },
        {
            header: "Lugar",
            accessorKey: "client_name",
            cell: (row) => row.getValue(),
        }
    ];

    const table = useReactTable({
        data: logs || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    })

    const currentDate = new Date();

    return (
        <MainWrapper>

            <div className="flex flex-col gap-4">

                <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-row items-center gap-2 py-4">
                        <Calendar size={32} className="" />
                        <Label className="text-2xl font-bold">{formatDate(currentDate)}</Label>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <InputSearch
                            placeholder="Buscar empleado..."
                            value={(table.getColumn("employee_name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("employee_name")?.setFilterValue(event.target.value)
                            }
                            className="w-80"
                        />
                    </div>

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
                                        onClick={() => navigate(`/employee/${row.original.employee_id}`)}
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
                                        {isLoading ? <Loader /> : "Sin resultados."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>


            </div>
        </MainWrapper>
    )
}