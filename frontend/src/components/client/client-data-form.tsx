import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react";

interface ClientDataFormProps {
    form: any;
    onSubmit: (data: any) => void;
    formType: 'create' | 'edit';
}

export const ClientDataForm = ({ form, onSubmit, formType }: ClientDataFormProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre *</FormLabel>
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
                <Button type="submit">
                    {formType === 'create' ? 'Crear' : 'Editar'}
                    <Check />
                </Button>
            </form>
        </Form>
    );
}