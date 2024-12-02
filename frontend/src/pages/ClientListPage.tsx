import EmployeeTable from "@/components/tables/EmployeeLogTable";
import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientTable } from "@/components/tables/ClientTable";

interface Client {
    id: number;
    name: string;
    location: string;
}

const mockData: Client[] = [
    {
        id: 1,
        name: "Pescaderia Rivadavia",
        location: "12345678"
    },
    {
        id: 1,
        name: "Pescaderia Rivadavia",
        location: "12345678"
    },
];

export const ClientListPage = () => {
    return (
        <MainWrapper>


            <ClientTable data={mockData} />

        </MainWrapper>
    )
}