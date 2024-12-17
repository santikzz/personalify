import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Edit, IdCard, Mail, Phone } from 'lucide-react'
import { Employee } from "@/types/Employee.types"
import { Loader } from "@/components/loader";
import { Link } from "react-router-dom";

export function EmployeeHeader({ employee, isLoading }: { employee: Employee, isLoading: boolean }) {
    return (
        <Card>
            {isLoading ?
                <div className="p-4 flex justify-center items-center">
                    <Loader />
                </div>
                : (<>
                    <CardContent className="flex flex-row items-center gap-4 pt-6">
                        <div className="flex flex-row w-full justify-between">

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <CardTitle className="text-2xl">{employee?.name}</CardTitle>
                                    <Link to={`/employee/${employee?.id}/edit`} className="flex items-center gap-1"><Edit size={16} /><span>Editar</span></Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IdCard className="h-4 w-4 opacity-70" /> <span>{"#dni"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 opacity-70" /> <span>{"#phone"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 opacity-70" /> <span>{"#email"}</span>
                                </div>
                            </div>
                            <img className="aspect-square w-32" src="/static/qr_example.png" />
                        </div>
                    </CardContent>
                </>
                )}
        </Card>
    );
}