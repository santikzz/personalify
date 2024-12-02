import { EmployeeLogTable } from "@/components/tables/EmployeeLogTable";
import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

interface EmployeeLogR {
    id: number;
    name: string;
    date: string;
    check_in_time: string;
    check_out_time: string;
    location: string;
}

const mockData: EmployeeLogR[] = [
    {
        id: 1,
        name: "asdasd Bugnon",
        date: "22/09/2021",
        check_in_time: "01:00",
        check_out_time: "17:00",
        location: "9 de Julio 1234"
    },
    {
        id: 1,
        name: "ghjghjgh Bugnon",
        date: "01/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        location: "9 de Julio 1234"
    },
    {
        id: 1,
        name: "Santiago Bugnon",
        date: "23/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        location: "9 de Julio 1234"
    },
    {
        id: 1,
        name: "dbvxere Bugnon",
        date: "12/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        location: "9 de Julio 1234"
    },
    {
        id: 1,
        name: "zzzzz Bugnon",
        date: "07/09/2021",
        check_in_time: "08:00",
        check_out_time: "17:00",
        location: "9 de Julio 1234"
    },
    {
        id: 1,
        name: "aaaa Bugnon",
        date: "21/09/2020",
        check_in_time: "08:00",
        check_out_time: "17:00",
        location: "9 de Julio 1234"
    },
    {
        id: 1,
        name: "Santiago Bugnon",
        date: "21/09/2021",
        check_in_time: "24:00",
        check_out_time: "17:00",
        location: "9 de Julio 1234"
    },
]

export const EmployeePage = () => {

    const { employeeId } = useParams();

    return (
        <MainWrapper>

            <div className="p-4   flex-1">

                <div className="flex flex-col gap-2">

                    <Label className="text-xl font-bold">Santiago, Bugnon</Label>
                    <Label className="text-sm"><span className="font-bold">DNI:</span> 43149446</Label>
                    <Label className="text-sm"><span className="font-bold">Telefono:</span> 2494202627</Label>
                    <Label className="text-sm"><span className="font-bold">Direccion:</span> 9 de Julio 1234</Label>

                </div>

            </div>


            <div className="pt-4">
                <Label className="text-2xl font-bold">Historial</Label>
                <EmployeeLogTable data={mockData} />
            </div>

        </MainWrapper>
    )
}