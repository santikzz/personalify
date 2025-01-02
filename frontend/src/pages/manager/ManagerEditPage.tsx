import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import MainWrapper from "@/components/MainWrapper"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from "react-router-dom"
import { useAlertDialog } from "@/components/useAlertDialog"
import { ManagerDataForm } from "@/components/manager/manager-data-form"
import { useManager, useUpdateManager } from "@/hooks/queries/managers"
import { useRandomPassword } from "@/hooks/use-random-password"

const formSchema = z.object({
    employee_id: z.string(),
    username: z.string(),
    password: z.string(),
    disabled: z.string(),
});

export const ManagerEditPage = () => {

    const { managerId } = useParams();
    const { data: manager, isLoading } = useManager(managerId);
    const { mutate: updateManager, isSuccess, isError } = useUpdateManager(managerId);

    const navigate = useNavigate();
    const { showDialog, AlertDialogComponent } = useAlertDialog();
    // const { password, createPassword } = useRandomPassword();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });


    /*
    * useEffect() will be called when the manager from useManager() is loaded
    * and will reset() the form with the manager data
    */
    const { reset } = form;
    useEffect(() => {
        if (manager) {
            reset({
                employee_id: manager.employee_id,
                username: manager.username,
                password: manager.password,
                disabled: manager.disabled,
            });
        }
    }, [manager, reset]);

    /*
    * onSubmit() will be called when the form is submitted
    * and will call the createManager function with the form values
    */
    function onSubmit(values: z.infer<typeof formSchema>) {
        updateManager(values);
    }

    useEffect(() => {
        if (isError) showDialog({ title: "Ah ocurrido un error", description: "Error actualizando gerente", actionText: "Cerrar", onAction: () => navigate("/managers") });
        if (isSuccess) showDialog({ title: "Gerente actualizado", description: "Gerente actualizado exitosamente", actionText: "Cerrar", onAction: () => navigate("/managers") });
    }, [isError, isSuccess]);

    return (
        <MainWrapper>
            <AlertDialogComponent />
            <div className="mx-auto max-w-3xl">
                <Label className="text-2xl font-semibold">Editar gerente</Label>
                <ManagerDataForm form={form} onSubmit={onSubmit} />
            </div>
        </MainWrapper>
    );
}

