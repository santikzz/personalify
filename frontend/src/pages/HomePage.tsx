import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import MainWrapper from "@/components/MainWrapper";
import { useGlobalContext } from "@/context/GlobalContext";
import { EmployeeLogTable } from "@/components/tables/EmployeeLogTable";
import { EmployeeLog } from "@/types/Employee.types";
import { Label } from "@/components/ui/label";

const data: EmployeeLog[] = [
    {
        id: 1,
        name: "John Doe",
        date: "24/11/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        manager: "Jane Doe",
        location: "Calle 123, Ciudad",
    }
]

export const HomePage = () => {

    const { user } = useGlobalContext();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <MainWrapper>

            <div className="flex flex-col gap-4">

                <div className="flex flex-col justify-between gap-4">
                    <div className="flex flex-row items-center gap-2 py-4">
                        <Calendar size={32} className="" />
                        <Label className="text-2xl font-bold">Martes 24, Noviembre</Label>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <Input placeholder="Buscar empleado..." className="w-64" />
                    </div>

                </div>

                <EmployeeLogTable data={data} />
            </div>
        </MainWrapper>
    )
}