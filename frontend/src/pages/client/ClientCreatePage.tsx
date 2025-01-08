import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import MainWrapper from "@/components/MainWrapper"
import { useCreateClient } from "@/hooks/queries/clients"
import { ClientDataForm } from "@/components/client/client-data-form"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string(),
});

export const ClientCreatePage = () => {

  /*
  * useCreateClient() is a custom react-query hook that returns an object with a function to create	a client. 
  * mutate: createClient is an alias we can use later to call the function.
  */
  const { mutate: createClient, isLoading, isSuccess, isError } = useCreateClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  /*
  * onSubmit() will be called when the form is submitted
  * and will call the createClient function with the form values
  */
  function onSubmit(values: z.infer<typeof formSchema>) {
    createClient(values);
  }

  useEffect(() => {
    if (isError) alert("Error creating client");
    if (isSuccess) alert("Client created successfully");
  }, [isError, isSuccess]);

  return (
    <MainWrapper>
      <div className="mx-auto max-w-3xl">
        <Label className="text-2xl font-semibold">Crear cliente</Label>
        <ClientDataForm form={form} onSubmit={onSubmit} formType="create" />
      </div>
    </MainWrapper>
  );
}