import { Alert, StyleSheet, Text, View } from "react-native"

import { useGlobalContext } from "@/context/GlobalContext";
import { BaseModal } from "@/components/modals/BaseModal"
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { useCheckIn } from "@/queries/manager";
import { router } from "expo-router";

export const StartShiftModal = ({ isOpen, setIsOpen, client }: any) => {

    const { user, setOnDuty } = useGlobalContext();
    const [maxHours, setMaxHours] = useState('8');
    const { mutate: checkInEmployee, isSuccess, isError } = useCheckIn();

    const handleStartShift = () => {
        const checkInData = {
            employee_id: user?.employee_id,
            max_work_minutes: (parseFloat(maxHours) * 60),
            check_in_time: new Date().toISOString(),
            date: new Date().toISOString(),
            client_id: client?.id,
        }
        checkInEmployee({ checkInData: checkInData });
    }

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            setOnDuty(true);
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
                    <View>
                        <Text className="text-lg">Lugar: {client?.name}</Text>
                        <Text className="text-lg">Gerente: {user?.name}</Text>
                    </View>

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
                    <Button onPress={handleStartShift}>Iniciar jornada</Button>
                </View>
            </View>
        </BaseModal>
    );
}