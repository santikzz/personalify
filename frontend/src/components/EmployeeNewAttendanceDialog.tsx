import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, Check, ChevronDown, Clock, PlusIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import { Button } from "@/components/ui/button"
import { useClients } from "@/hooks/queries/clients"
import { useManagers } from "@/hooks/queries/managers"
import { useAlertDialog } from "./useAlertDialog"
import { useCreateAttendance } from "@/hooks/queries/attendaces"

const formSchema = z.object({
    max_work_minutes: z.string(),
    date: z.string(),
    check_in_time: z.string(),
    check_out_time: z.string(),
    manager_id: z.string(),
    client_id: z.string()
});

export const EmployeeNewAttendanceDialog = ({ employee, disabled }: { employee: string, disabled: boolean }) => {

    const { showDialog, AlertDialogComponent } = useAlertDialog();

    const { data: clients, isLoading: clientsLoading } = useClients();
    const { data: managers, isLoading: managersLoading } = useManagers();
    const { mutate: createAttendance, isSuccess, isError } = useCreateAttendance(employee?.id);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "max_work_minutes": '8',
            "date": format(new Date(), "yyyy-MM-dd"),
            // "check_in_time": format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
            // "check_out_time": format(new Date(new Date().getTime() + 6 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm:ss"),
            "check_in_time": "09:00",
            "check_out_time": "15:00",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // values['max_work_minutes'] = values['max_work_minutes'] * 60;
        values['check_in_time'] = values['date'] + 'T' + values['check_in_time'] + ':00';
        values['check_out_time'] = values['date'] + 'T' + values['check_out_time'] + ':00';
        if(values['check_out_time'] < values['check_in_time']) {
            showDialog({ title: "Error", description: "La hora de salida no puede ser menor a la hora de entrada", actionText: "Cerrar" });
            return;
        }
        await createAttendance(values);
    }

    useEffect(() => {
        if (isError) showDialog({ title: "Ah ocurrido un error", description: "Error creando asistencia", actionText: "Cerrar" });
        if (isSuccess) showDialog({ title: "Nueva asistencia", description: "Nueva asistencia con exito", actionText: "Cerrar" });
    }, [isError, isSuccess]);

    return (
        <>
            <AlertDialogComponent />
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={disabled}><Clock />Nueva asistencia</Button>
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
                                        <FormLabel>Horas maximas *</FormLabel>
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
                                        <FormLabel>Fecha *</FormLabel>
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
                                        <FormLabel>Hora de entrada *</FormLabel>
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
                                        <FormLabel>Gerente *</FormLabel>
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
                                        <FormLabel>Cliente *</FormLabel>
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

                            <Button type="submit">Agregar <PlusIcon /></Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}