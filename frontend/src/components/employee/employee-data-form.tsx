import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react";

interface EmployeeDataFormProps {
    form: any;
    onSubmit: (data: any) => void;
    formType: 'create' | 'edit';
}

export const EmployeeDataForm = ({ form, onSubmit, formType }: EmployeeDataFormProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nombre"
                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dni"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>DNI *</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="DNI"
                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">
                        {formType === 'create' ? 'Crear' : 'Editar'}
                        <Check />
                    </Button>
                </div>
            </form>
        </Form>
    );
}