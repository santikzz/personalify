import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Mail, MapPin, Phone } from 'lucide-react'
import { Employee } from "@/types/Employee.types"

export function EmployeeHeader({ employee, isLoading }: { employee: Employee, isLoading: boolean }) {

    if (isLoading) return (<div>Cargando...</div>);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${employee?.name}`} alt={employee?.name} />
                    <AvatarFallback>{employee?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{employee?.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 opacity-70" /> <span>{"some data"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 opacity-70" /> <span>{"some data"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 opacity-70" /> <span>{"some data"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 opacity-70" /> <span>Hired on {"some data"}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}