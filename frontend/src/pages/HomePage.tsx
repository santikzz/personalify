import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import MainWrapper from "@/components/MainWrapper";
import { EmployeeLogTable } from "@/components/tables/EmployeeLogTable";

import { EmployeeLog } from "@/types/Employee.types";
import { useGlobalContext } from "@/context/GlobalContext";
import { useEffect } from "react";

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

            <div className="p-4">

                <div className="flex flex-col justify-between gap-4">

                    <div className="flex flex-row items-center gap-2 ">
                        <Calendar size={32} className="text-primary-500" />
                        <h2 className="text-2xl font-semibold">Martes 24, Noviembre</h2>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <Input placeholder="Buscar empleado..." className="w-64" />
                        <Button>Buscar</Button>
                    </div>

                </div>

            </div>
            <EmployeeLogTable data={data} />
        </MainWrapper>
    )
}