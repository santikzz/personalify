import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { Text, View, TouchableOpacity, ScrollView, Alert, Modal, Pressable, StyleSheet } from "react-native";

import { Input } from "@/components/Input";
import { useClients } from "@/queries/clients";
import { StartShiftModal } from "@/components/modals/StartShiftModal";

export const Welcome = () => {

    const { user } = useGlobalContext();

    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const { data: clients, isLoading: isClientsLoading } = useClients();

    // if search is not empty, filter clients by name
    const searchClients = search.length > 0 ? clients?.filter((client: any) => client.name.toLowerCase().includes(search.toLowerCase())) : clients;

    const handleStartDuty = (client: any) => {
        setSelectedClient(client);
        setModalOpen(true);
    };

    return (
        <View className='h-full flex flex-col justify-between'>

            <StartShiftModal isOpen={modalOpen} setIsOpen={setModalOpen} client={selectedClient} />

            <Text className='text-2xl font-bold'>Bienvenido, {user?.name}</Text>

            <View className='py-4'>
                <Input
                    placeholder='Buscar cliente ...'
                    className=''
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <Text className='text-xl font-semibold text-neutral-600 py-4'>Elige un cliente</Text>
            {isClientsLoading && <Text className='text-base text-neutral-600 py-4'>Cargando...</Text>}

            <ScrollView className='flex flex-col gap-4'>
                {searchClients?.map((client: any) => (
                    <TouchableOpacity
                        className='border-b border-neutral-400 p-4'
                        key={client?.id}
                        onPress={() => { handleStartDuty(client) }}
                    >
                        <Text className='text-lg'>{client?.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            
        </View>
    );
}