import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import MainWrapper from "@/components/MainWrapper"
import { useCreateEmployee } from "@/hooks/queries/employees"

/*
* formSchema defines the shape of the form and its values
*/
const formSchema = z.object({
  name: z.string(),
  qr_code: z.string(),
});

export const CreateEmployeePage = () => {
  /*
  * useCreateEmployee() is a custom react-query hook that returns an object with a function to create	an employee. 
  * mutate: createEmployee is an alias we can use later to call the function.
  */
  const { mutate: createEmployee, isLoading, isSuccess, isError } = useCreateEmployee();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  /*
  * onSubmit() will be called when the form is submitted
  * and will call the createEmployee function with the form values
  */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    createEmployee(values);
  }

  useEffect(() => {
    if (isError) alert("Error creating employee");
    if (isSuccess) alert("Employee created successfully");
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
  );
}