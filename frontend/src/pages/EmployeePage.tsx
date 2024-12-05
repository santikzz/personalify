import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Adjust imports for ShadCN components
import { Checkbox } from "@/components/ui/checkbox";
import { Employee, EmployeeLogRow } from "@/types/Employee.types";
import { fetchEmployee } from "@/services/api";


const mockData: EmployeeLogRow[] = [
    {
        id: 1,
        name: "asdasd Bugnon",
        date: "22/09/2021",
        check_in_time: "01:00",
        check_out_time: "17:00",
        total_hours: "16",
        manager: "Jane Doe",
        location: "9 de Julio 1234",
        is_paid: true
    },
    {
        id: 1,
        name: "ghjghjgh Bugnon",
        date: "01/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        total_hours: "16",
        manager: "Jane Doe",
        location: "9 de Julio 1234",
        is_paid: true
    },
    {
        id: 1,
        name: "Santiago Bugnon",
        date: "23/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        total_hours: "16",
        manager: "Jane Doe",
        location: "9 de Julio 1234",
        is_paid: false
    },
    {
        id: 1,
        name: "dbvxere Bugnon",
        date: "12/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        total_hours: "16",
        manager: "Jane Doe",
        location: "9 de Julio 1234",
        is_paid: false
    },
    {
        id: 1,
        name: "zzzzz Bugnon",
        date: "07/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        total_hours: "16",
        manager: "Jane Doe",
        location: "9 de Julio 1234",
        is_paid: false
    },
    {
        id: 1,
        name: "aaaa Bugnon",
        date: "21/09/2020",
        check_in_time: "08:00",
        check_out_time: "17:00",
        total_hours: "16",
        manager: "Jane Doe",
        location: "9 de Julio 1234",
        is_paid: true
    },
    {
        id: 1,
        name: "Santiago Bugnon",
        date: "21/09/2021",
        check_in_time: "24:00",
        check_out_time: "17:00",
        total_hours: "16",
        manager: "Jane Doe",
        location: "9 de Julio 1234",
        is_paid: true
    },
]

export const EmployeePage = () => {

    const { employeeId } = useParams();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [selectedRows, setSelectedRows] = useState<EmployeeLogRow[]>([]);

    useEffect(() => { 
        const fetch = async () => {
            const data = await fetchEmployee(employeeId);
            setEmployee(data);

        }
        fetch();
    }, []);

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
        data: mockData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        console.log(selectedRows);
    }, [selectedRows])


    return (
        <MainWrapper>

            <div className="p-4   flex-1">

                <div className="flex flex-col gap-2">

                    <Label className="text-xl font-bold">{employee?.name}</Label>
                    {/* <Label className="text-sm"><span className="font-bold">DNI:</span> 43149446</Label>
                    <Label className="text-sm"><span className="font-bold">Telefono:</span> 2494202627</Label>
                    <Label className="text-sm"><span className="font-bold">Direccion:</span> 9 de Julio 1234</Label> */}

                </div>

            </div>


            <div className="pt-4 flex flex-col gap-4">
                <Label className="text-2xl font-bold">Historial</Label>

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


            </div>

        </MainWrapper>
    )
}