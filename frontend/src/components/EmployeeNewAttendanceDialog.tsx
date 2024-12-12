import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Check, ChevronDown, Clock, PlusIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import { createAttendance } from "@/services/api"
import { Button } from "@/components/ui/button"
import { useClients } from "@/hooks/queries/clients"
import { useManagers } from "@/hooks/queries/managers"

const formSchema = z.object({
    max_work_minutes: z.number(),
    date: z.string(),
    check_in_time: z.string(),
    check_out_time: z.string(),
    manager_id: z.string(),
    client_id: z.string()
});

export const EmployeeNewAttendanceDialog = ({ employeeId }: { employeeId: string }) => {

    const { data: clients, isLoading: clientsLoading } = useClients();
    const { data: managers, isLoading: managersLoading } = useManagers();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "max_work_minutes": 8,
            "date": format(new Date(), "yyyy-MM-dd"),
            // "check_in_time": format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
            // "check_out_time": format(new Date(new Date().getTime() + 6 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss"),
            "check_in_time": "09:00",
            "check_out_time": "15:00",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        values['max_work_minutes'] = values['max_work_minutes'] * 60;
        values['check_in_time'] = values['date'] + 'T' + values['check_in_time'] + ':00';
        values['check_out_time'] = values['date'] + 'T' + values['check_out_time'] + ':00';
        // console.log(values);
        const response = await createAttendance(employeeId, values);
        if (response !== null) {
            alert('created');
        }
        // console.log(response);
    }
    return (

        <Dialog>
            <DialogTrigger asChild>
                <Button className=""><Clock />Nueva asistencia {"(debug)"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Nueva asistencia</DialogTitle>
                    <DialogDescription>
                        Complete la siguiente informacion para agregar una nueva asistencia.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                        <FormField
                            control={form.control}
                            name="max_work_minutes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horas maximas</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            type="number"
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Fecha</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="check_in_time"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Hora de entrada</FormLabel>
                                    <Input
                                        placeholder=""
                                        type="text"
                                        {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="check_out_time"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Hora de salida</FormLabel>
                                    <Input
                                        placeholder=""
                                        type="text"
                                        {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="manager_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Gerente</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn("justify-between", !field.value && "text-muted-foreground")}
                                                >
                                                    {field.value
                                                        ? managers.find((manager) => manager.id === field.value)?.employee_name
                                                        : "Seleccione un gerente"}
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
                                                        {managers.map((manager) => (
                                                            <CommandItem
                                                                value={manager.employee_name}
                                                                key={manager.id}
                                                                onSelect={() => {
                                                                    form.setValue("manager_id", manager.id)
                                                                }}
                                                            >
                                                                {manager.employee_name}
                                                                <Check className={cn(
                                                                    "ml-auto",
                                                                    manager.id === field.value
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
                            name="client_id"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Cliente</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn("justify-between", !field.value && "text-muted-foreground")}
                                                >
                                                    {field.value
                                                        ? clients.find((client) => client.id === field.value)?.name
                                                        : "Seleccione un cliente"}
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
                                                        {clients.map((client) => (
                                                            <CommandItem
                                                                value={client.name}
                                                                key={client.id}
                                                                onSelect={() => {
                                                                    form.setValue("client_id", client.id)
                                                                }}
                                                            >
                                                                {client.name}
                                                                <Check className={cn(
                                                                    "ml-auto",
                                                                    client.id === field.value
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

                        <Button type="submit">Aceptar <PlusIcon /></Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}