import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Logs, ReceiptText } from "lucide-react";

import MainWrapper from "@/components/MainWrapper";
import { useEmployee } from "@/hooks/queries/employees";
import { EmployeeHeader } from "@/components/employee/employee-header";
import { AttendanceTable } from "@/components/employee/attendance-table";
import { InvoiceTable } from "@/components/employee/invoice-table";

export const EmployeeDetailPage = () => {

    const { employeeId } = useParams();
    const { data: employee, isLoading: employeeLoading } = useEmployee(employeeId || "none");

    return (
        <MainWrapper>
            <EmployeeHeader employee={employee} isLoading={employeeLoading} />
            <div className="pt-4 flex flex-col gap-4">
                <div className="w-full">
                    <div className="rounded-md border">
                        <Tabs defaultValue="attendance" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 h-12">
                                <TabsTrigger className="h-10 font-semibold text-base gap-1" value="attendance"><Logs size={16} /> Asistencia</TabsTrigger>
                                <TabsTrigger className="h-10 font-semibold text-base gap-1" value="invoices"> <ReceiptText size={16} /> Facturaciones</TabsTrigger>
                            </TabsList>
                            <TabsContent value="attendance">
                                <AttendanceTable employee={employee} />
                            </TabsContent>
                            <TabsContent value="invoices">
                                <InvoiceTable employee={employee} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </MainWrapper>
    );
}