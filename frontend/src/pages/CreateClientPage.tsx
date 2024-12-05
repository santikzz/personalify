import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MainWrapper from "@/components/MainWrapper"
import { useCreateClient } from "@/hooks/queries/clients"

const formSchema = z.object({
  name: z.string(),
});

export const CreateClientPage = () => {

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nombre"

                    type="text"
                    {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">Submit</Button>
        </form>
      </Form>

    </MainWrapper>
  )
}