import { useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"; // Adjust imports for ShadCN components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// import EmployeeTable from "@/components/EmployeeTable";
import MainWrapper from "@/components/MainWrapper";
import { EmployeeTable } from "@/components/tables/EmployeeTable";

interface Employee {
    id: number;
    name: string;
    dni: string;
}

const personal: Employee[] = [
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "Santiago Llaurado",
        dni: "43149446",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
    {
        id: 1,
        name: "John Doe",
        dni: "12345678",
    },
]

export const EmployeeListPage = () => {
    return (
        <MainWrapper>

            <div className="p-4">

                <div className="flex flex-col justify-between gap-4">

                    {/* <div className="flex flex-row items-center gap-2">
                        <Input placeholder="Buscar empleado..." className="w-64" />
                        <Button>Buscar</Button>
                    </div> */}

                </div>

            </div>


            <EmployeeTable data={personal} />

        </MainWrapper>
    )
}