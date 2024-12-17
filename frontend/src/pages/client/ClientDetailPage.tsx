import { ClientHeader } from "@/components/client/client-header";
import MainWrapper from "@/components/MainWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClient } from "@/hooks/queries/clients";
import { useParams } from "react-router-dom";

export const ClientDetailPage = () => {

    const { clientId } = useParams();
    const { data: client, isLoading: clientLoading } = useClient(clientId);

    return (
        <MainWrapper>

            <ClientHeader client={client} isLoading={clientLoading} />

        </MainWrapper>
    )
}