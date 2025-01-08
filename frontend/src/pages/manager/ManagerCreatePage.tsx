import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import MainWrapper from "@/components/MainWrapper"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useAlertDialog } from "@/components/useAlertDialog"
import { ManagerDataForm } from "@/components/manager/manager-data-form"
import { useCreateManager } from "@/hooks/queries/managers"
// import { useRandomPassword } from "@/hooks/use-random-password"

const formSchema = z.object({
    employee_id: z.string(),
    username: z.string(),
    password: z.string(),
    disabled: z.string(),
});

export const ManagerCreatePage = () => {

    const { mutate: createManager, isLoading, isSuccess, isError } = useCreateManager();

    const navigate = useNavigate();
    const { showDialog, AlertDialogComponent } = useAlertDialog();
    // const { password, createPassword } = useRandomPassword();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            disabled: "0",
        }
    });
    

    /*
    * useEffect() will be called when the client from useClient() is loaded
    * and will reset() the form with the client data
    */
    // const { reset } = form;
    // useEffect(() => {
    //     if (password) {
    //         reset({
    //             password: password,
    //         });
    //     }
    // }, [password, reset]);

    /*
    * onSubmit() will be called when the form is submitted
    * and will call the createManager function with the form values
    */
    function onSubmit(values: z.infer<typeof formSchema>) {
        createManager(values);
    }

    useEffect(() => {
        if (isError) showDialog({ title: "Ah ocurrido un error", description: "Error creando gerente", actionText: "Cerrar", onAction: () => navigate("/managers") });
        if (isSuccess) showDialog({ title: "Gerente creado", description: "Gerente creado exitosamente", actionText: "Cerrar", onAction: () => navigate("/managers") });
    }, [isError, isSuccess]);

    return (
        <MainWrapper>
            <AlertDialogComponent />
            <div className="mx-auto max-w-3xl">
                <Label className="text-2xl font-semibold">Crear gerente</Label>
                <ManagerDataForm form={form} onSubmit={onSubmit} formType="create" />
            </div>
        </MainWrapper>
    );
}

