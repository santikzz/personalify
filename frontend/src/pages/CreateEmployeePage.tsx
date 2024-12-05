import { useState } from "react"
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
import { createEmployee } from "@/services/api"

const formSchema = z.object({
  name: z.string(),
  qr_code: z.string(),
});

export const CreateEmployeePage = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const response = await createEmployee(values);
    alert(response);

  }

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

          <FormField
            control={form.control}
            name="qr_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>QR CODE</FormLabel>
                <FormControl>
                  <Input
                    placeholder="code"

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