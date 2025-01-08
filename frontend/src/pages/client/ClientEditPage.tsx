import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import MainWrapper from "@/components/MainWrapper"
import { useClient, useUpdateClient } from "@/hooks/queries/clients"
import { ClientDataForm } from "@/components/client/client-data-form"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from "react-router-dom"
import { useAlertDialog } from "@/components/useAlertDialog"


const formSchema = z.object({
  name: z.string(),
});

export const ClientEditPage = () => {

  const { clientId } = useParams();
  const { data: client, isLoading: isClientLoading } = useClient(clientId);
  const { mutate: updateClient, isUpdateLoading, isSuccess, isError } = useUpdateClient(clientId);

  const navigate = useNavigate();
  const { showDialog, AlertDialogComponent } = useAlertDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  /*
  * useEffect() will be called when the client from useClient() is loaded
  * and will reset() the form with the client data
  */
  const { reset } = form;
  useEffect(() => {
    if (client) {
      reset({
        name: client.name,
      });
    }
  }, [client, reset]);

  /*
  * onSubmit() will be called when the form is submitted
  * and will call the createClient function with the form values
  */
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateClient(values);
  }

  useEffect(() => {
    if (isError) showDialog({ title: "Ah ocurrido un error", description: "Error editando cliente", actionText: "Cerrar", onAction: () => navigate("/clients") });
    if (isSuccess) showDialog({ title: "Cliente actualizado", description: "Cliente actualizado exitosamente", actionText: "Cerrar", onAction: () => navigate("/clients") });
  }, [isError, isSuccess]);

  return (
    <MainWrapper>
      <AlertDialogComponent />
      <div className="mx-auto max-w-3xl">
        <Label className="text-2xl font-semibold">Editar cliente</Label>
        <ClientDataForm form={form} onSubmit={onSubmit} formType="edit" />
      </div>
    </MainWrapper>
  );
}

