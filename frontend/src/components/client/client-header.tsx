import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Edit, Mail, Map, Phone } from 'lucide-react'
import { Loader } from "@/components/loader";
import { Link } from "react-router-dom";
import { Client } from "@/types/Client.types";

export function ClientHeader({ client, isLoading }: { client: Client, isLoading: boolean }) {
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
                                    <CardTitle className="text-2xl">{client?.name}</CardTitle>
                                    <Link to={`/client/${client?.id}/edit`} className="flex items-center gap-1"><Edit size={16} /><span>Editar</span></Link>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Map className="h-4 w-4 opacity-70" /> <span>{"#ubicacion"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 opacity-70" /> <span>{"#phone"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 opacity-70" /> <span>{"#email"}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </>
                )}
        </Card>
    );
}