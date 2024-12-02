// import EmployeeTable from "@/components/tables/EmployeeLogTable";
import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search } from "lucide-react";

export const HomePage = () => {

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

            {/* <EmployeeTable /> */}

        </MainWrapper>
    )
}