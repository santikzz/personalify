import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Check, ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { useEmployees } from "@/hooks/queries/employees";

export const ManagerDataForm = ({ form, onSubmit }: any) => {

    const { data: employees, isLoading } = useEmployees();

    if (isLoading) return <div>Cargando...</div>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">

                <FormField
                    control={form.control}
                    name="employee_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Empleado</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn("justify-between", !field.value && "text-muted-foreground")}
                                        >
                                            {field.value
                                                ? employees.find((employee) => employee.id === field.value)?.name
                                                : "Seleccione un empleado"}
                                            <ChevronDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[375px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Buscar..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>Sin resultados.</CommandEmpty>
                                            <CommandGroup>
                                                {employees.map((employee) => (
                                                    <CommandItem
                                                        value={employee.name}
                                                        key={employee.id}
                                                        onSelect={() => {
                                                            form.setValue("employee_id", employee.id)
                                                        }}
                                                    >
                                                        {employee.name}
                                                        <Check className={cn(
                                                            "ml-auto",
                                                            employee.id === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Clave</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    type="text"
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">Aceptar<Check /></Button>
                </div>
            </form>
        </Form>
    );
}