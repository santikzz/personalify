import { useEffect, useState } from "react";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    flexRender,
} from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import EmployeeTable from "@/components/EmployeeTable";
import MainWrapper from "@/components/MainWrapper";

import { fetchEmployees } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface Employee {
    id: number;
    name: string;
    qr_code: string;
}

export const EmployeeListPage = () => {

    const [employees, setEmployees] = useState<Employee[] | null>(null);
    useEffect(() => {

        const fetch = async () => {
            const data = await fetchEmployees();
            setEmployees(data);
        }
        fetch();

    }, []);

    const [search, setSearch] = useState<string>("");

    const navigate = useNavigate();

    const columns: ColumnDef<Employee>[] = [
        {
            header: "Nombre",
            accessorKey: "name",
            cell: (info) => info.getValue(),
        },
        {
            header: "DNI",
            accessorKey: "dni",
            cell: (info) => info.getValue(),
        },
    ];

    const table = useReactTable({
        data: employees || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <MainWrapper>

            <div className="w-full">

                <div className="flex items-center justify-between py-4">
                    <Input
                        placeholder="Buscar empleado..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button onClick={() => navigate('/newemployee')}><Plus />Nuevo empleado</Button>
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
                                        onClick={() => navigate(`/employee/${row.original.id}`)}
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
                                        Sin resultados.
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