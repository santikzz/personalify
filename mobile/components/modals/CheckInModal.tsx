import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { useGlobalContext } from "@/context/GlobalContext";
import { BaseModal } from "@/components/modals/BaseModal"
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { useCheckIn } from "@/queries/manager";
import { router } from "expo-router";
import { useClients } from "@/queries/clients";

export const CheckInModal = ({ isOpen, setIsOpen }: any) => {

    const { user, lastClient } = useGlobalContext();

    const { data: clients, isLoading: isClientsLoading } = useClients();
    const { mutate: checkInEmployee, isSuccess, isError } = useCheckIn();

    const [maxHours, setMaxHours] = useState('8');
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const searchClients = search.length > 0 ? clients?.filter((client: any) => client.name.toLowerCase().includes(search.toLowerCase())) : [];

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            // router.replace('/(tabs)');
        }
        if (isError) {
            Alert.alert('Error', 'No se pudo iniciar la jornada');
        }
    }, [isSuccess, isError]);

    return (
        <BaseModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <View className="flex flex-col justify-between h-full">

                <View className="flex flex-col gap-4">
                    <Text className="font-bold text-2xl text-center">Iniciar Jornada</Text>


                    <ScrollView className='flex flex-col gap-4'>
                        {searchClients?.map((client: any) => (
                            <TouchableOpacity
                                className='border-b border-neutral-400 p-4'
                                key={client?.id}
                                onPress={() => { }}
                            >
                                <Text className='text-lg'>{client?.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="flex flex-col gap-2">
                        <Text>Canidad de horas maximas para gerente</Text>
                        <Input
                            placeholder='8'
                            className=''
                            value={maxHours}
                            onChangeText={setMaxHours}
                            keyboardType='numeric'
                        ></Input>
                    </View>
                </View>

                <View>
                    {/* <Button>Iniciar jornada</Button> */}
                </View>
            </View>
        </BaseModal>
    );
}