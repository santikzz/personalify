import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import MainWrapper from "@/components/MainWrapper"
import { useEmployee, useUpdateEmployee } from "@/hooks/queries/employees"
import { EmployeeDataForm } from "@/components/employee/employee-data-form"
import { Loader } from "@/components/loader"
import { Label } from "@/components/ui/label"
import { useAlertDialog } from "@/components/useAlertDialog"

/*
* formSchema defines the shape of the form and its values
*/
const formSchema = z.object({
    name: z.string(),
    dni: z.string(),
});

export const EmployeeEditPage = () => {

    const { employeeId } = useParams();
    const { data: employee, isLoading: isEmployeeLoading } = useEmployee(employeeId || "none");
    const { mutate: updateEmployee, isLoading, isSuccess, isError } = useUpdateEmployee(employeeId);

    const navigate = useNavigate();
    const { showDialog, AlertDialogComponent } = useAlertDialog();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    /*
    * useEffect() will be called when the employee from useEmployee() is loaded
    * and will reset() the form with the employee data
    */
    const { reset } = form;
    useEffect(() => {
        if (employee) {
            reset({
                name: employee.name,
                dni: employee.dni
            });
        }
    }, [employee, reset]);

    /*
    * onSubmit() will be called when the form is submitted
    * and will call the createEmployee function with the form values
    */
    async function onSubmit(values: z.infer<typeof formSchema>) {
        updateEmployee(values);
    }

    useEffect(() => {
        if (isError) showDialog({ title: "Ah ocurrido un error.", description: "Error editando empleado", actionText: "Cerrar", onAction: () => navigate(`/employee/${employee?.id}`) });
        if (isSuccess) showDialog({ title: "Empleado actualizado.", description: "¡Empleado actualizado exitosamente!", actionText: "Cerrar", onAction: () => navigate(`/employee/${employee?.id}`) });
    }, [isError, isSuccess]);

    return (
        <MainWrapper>
            <AlertDialogComponent />
            <div className="mx-auto max-w-3xl">
                <Label className="text-2xl font-semibold">Editar empleado</Label>
                {isEmployeeLoading ?
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                    :
                    <EmployeeDataForm form={form} onSubmit={onSubmit} formType="edit"/>
                }
            </div>
        </MainWrapper>
    );
}