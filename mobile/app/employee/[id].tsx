import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';

import { useGlobalContext } from "@/context/GlobalContext";
import { useEmployee } from "@/queries/employees";
import { useCheckIn, useCheckOut } from "@/queries/manager";
import { Header } from "@/components/Header";
import { GoBack } from "@/components/GoBack";
import { useClients } from "@/queries/clients";
import { Appbar, Button, TextInput } from "react-native-paper";
// import { Button } from "@/components/Button";

export default function EmployeeScreen() {

    const { id } = useLocalSearchParams();
    const { user, lastClient, setLastClient } = useGlobalContext();

    const [maxHours, setMaxHours] = useState<string>('8');
    const [searchClient, setSearchClient] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedClient, setSelectedClient] = useState<string | null>(null);

    const { data: employee, isLoading } = useEmployee(id);
    const { data: clients, isLoading: isClientsLoading } = useClients();
    const { mutate: checkInEmployee, isSuccess: checkInSuccess, isError: checkInError } = useCheckIn();
    const { mutate: checkOutEmployee, isSuccess: checkOutSuccess, isError: checkOutError } = useCheckOut();

    const filteredClients = searchClient.length > 0 ? clients?.filter((client: any) => client.name.toLowerCase().includes(searchClient.toLowerCase())) : [];

    const handleCheckIn = () => {
        if (selectedClient == null) {
            Alert.alert('Error', 'Debes seleccionar un cliente');
            return;
        }
        if (maxHours == '' || parseFloat(maxHours) <= 0) {
            Alert.alert('Error', 'Debes ingresar cantidad de horas valida');
            return;
        }
        Alert.alert(
            'Confirmar entrada',
            `${employee?.name}\nCliente: ${selectedClient?.name}\nHoras maximas: ${maxHours}`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Confirmar",
                    onPress: () => { doCheckIn() },
                },
            ],
            { cancelable: true }
        );
    }

    const handleCheckOut = () => {
        Alert.alert(
            'Confirmar salida',
            `Confirmar salida para ${employee?.name}`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Confirmar",
                    onPress: () => { doCheckOut() },
                },
            ],
            { cancelable: true }
        );
    }

    const doCheckIn = () => {
        const checkInData = {
            employee_id: employee?.id,
            max_work_minutes: (parseFloat(maxHours) * 60),
            check_in_time: new Date().toISOString(),
            date: new Date().toISOString(),
            client_id: selectedClient?.id,
        }
        setLastClient(selectedClient);
        checkInEmployee({ checkInData: checkInData });
    }

    const doCheckOut = () => {
        const checkOutData = {
            employee_id: employee?.id,
        }
        checkOutEmployee({ checkOutData: checkOutData });
    }

    useEffect(() => {
        if (checkInSuccess) {
            Alert.alert('Entrada registrada');
        }
        if (checkInError) {
            Alert.alert('Error', 'No se pudo registrar la entrada');
        }
    }, [checkInSuccess, checkInError]);

    useEffect(() => {
        if (checkOutSuccess) {
            Alert.alert('Salida registrada');
        }
        if (checkOutError) {
            Alert.alert('Error', 'No se pudo registrar la salida');
        }
    }, [checkOutSuccess, checkOutError]);

    return (
        <SafeAreaView className="h-full bg-white">

            {/* <Header>
                <GoBack />
            </Header> */}

            <Appbar.Header>
                <Appbar.BackAction onPress={() => { router.back() }} />
                <Appbar.Content title='Volver' />
            </Appbar.Header>

            <View style={styles.main}>

                <View className="border rounded-md border-neutral-300 p-4">
                    <Text className='text-2xl font-bold'>{employee?.name}</Text>
                    <Text className='text-lg'>DNI: {employee?.dni}</Text>
                    {employee?.on_shift != null && (
                        <View>
                            <Text className='text-lg'>Actualmente en: {employee?.on_shift.client_name}</Text>
                            <Text className='text-lg'>Entrada: {employee?.on_shift.check_in_time}</Text>
                        </View>
                    )}
                </View>

                {employee?.on_shift == null ? (
                    <View className="flex flex-col gap-4">
                        <View className="border rounded-md border-neutral-300 p-4">
                            <TextInput
                                label='Buscar cliente ...'
                                value={searchClient}
                                onChangeText={setSearchClient}
                            />
                            <ScrollView className='flex flex-col gap-4'>

                                {lastClient != null && (
                                    <TouchableOpacity
                                        className='border-b border-neutral-400 p-4'
                                        onPress={() => { setSelectedClient(lastClient) }}
                                    >
                                        <Text className='text-lg'>{lastClient?.name}</Text>
                                    </TouchableOpacity>
                                )}

                                {filteredClients?.map((client: any) => (
                                    <TouchableOpacity
                                        key={client?.id}
                                        className='border-b border-neutral-400 p-4'
                                        onPress={() => { setSelectedClient(client) }}
                                    >
                                        <Text className='text-lg'>{client?.name}</Text>
                                    </TouchableOpacity>
                                ))}

                            </ScrollView>

                            <View className="pt-3">
                                <Text>Cliente seleccionado: {selectedClient?.name}</Text>
                            </View>
                        </View>

                        <TextInput
                            label='Cantidad de horas maximas'
                            value={maxHours}
                            onChangeText={setMaxHours}
                            keyboardType='numeric'
                        />

                        <Button
                            icon='location-enter'
                            mode='contained'
                            onPress={handleCheckIn}
                            contentStyle={{ paddingVertical: 6 }}
                        >
                            Marcar entrada
                        </Button>

                    </View>

                ) : (
                    <View>
                        <Button
                            icon='location-enter'
                            mode='contained'
                            onPress={handleCheckOut}
                            contentStyle={{ paddingVertical: 6 }}
                        >
                            Marcar salida
                        </Button>
                    </View>
                )}

            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 16,
        padding: 16,
    }
});