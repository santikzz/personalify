import { EmployeeTable } from "@/components/tables/EmployeeTable";
import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";

export const ClientPage = () => {

    const { clientId } = useParams();

    return (
        <MainWrapper>

            <div className="p-4 border rounded-md flex-1">

                <div className="flex flex-col gap-2">

                    <Label className="text-base font-bold">Pescaderia Rivadavia</Label>
                    <Label className="text-base"><span className="font-bold">DNI:</span> 43149446</Label>
                    <Label className="text-base"><span className="font-bold">Telefono:</span> 2494202627</Label>
                    <Label className="text-base"><span className="font-bold">Direccion:</span> 9 de Julio 1234</Label>

                </div>

            </div>

            <EmployeeTable data={[]} />

        </MainWrapper>
    )
}