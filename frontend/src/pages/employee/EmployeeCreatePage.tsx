import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Label } from "@/components/ui/label"

import MainWrapper from "@/components/MainWrapper"
import { useCreateEmployee } from "@/hooks/queries/employees"
import { EmployeeDataForm } from "@/components/employee/employee-data-form"

/*
* formSchema defines the shape of the form and its values
*/
const formSchema = z.object({
  name: z.string(),
  dni: z.string(),
});

export const EmployeeCreatePage = () => {
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
      <div className="mx-auto max-w-3xl">
        <Label className="text-2xl font-semibold">Crear empleado</Label>
        <EmployeeDataForm form={form} onSubmit={onSubmit} formType="create"/>
      </div>
    </MainWrapper>
  );
}