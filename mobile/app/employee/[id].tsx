import { Button } from "@/components/Button";
import { GoBack } from "@/components/GoBack";
import { Header } from "@/components/Header";
import { useEmployee, useEmployeesByDni } from "@/queries/employees";
import { useCheckIn, useCheckOut } from "@/queries/manager";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

export default function EmployeeScreen() {

    const { id } = useLocalSearchParams();
    // const navigation = useNavigation();
    // useLayoutEffect(() => {
    //     navigation.setOptions({ headerShown: false });
    // }, [navigation]);

    const { data: employee, isLoading } = useEmployee(id);
    const { mutate: checkInEmployee, isSuccess: checkInSuccess, isError: checkInError } = useCheckIn();
    const { mutate: checkOutEmployee, isSuccess: checkOutSuccess, isError: checkOutError } = useCheckOut();

    const handleCheckIn = () => {
        const checkInData = {
            employee_id: employee?.id,
            max_work_minutes: 480, // 8 hours
            check_in_time: new Date().toISOString(),
            date: new Date().toISOString(),
            client_id: 2,
        }
        checkInEmployee({ checkInData: checkInData });
    }

    const handleCheckOut = () => {
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
        <SafeAreaView className="min-h-screen bg-white">

            <View className={`flex justify-center px-4 h-16 bg-white border-b border-neutral-300`}>
                <GoBack />
            </View>

            <View className='p-4 flex flex-col justify-between'>

                <View className="mt-8">
                    <Text className='text-2xl font-bold'>{employee?.name}</Text>
                    <Text className='text-2xl font-bold'>{employee?.dni}</Text>
                </View>

                <View className="mt-8 flex flex-col gap-4">
                    <Button
                        onPress={handleCheckIn}
                    >
                        Marcar entrada
                    </Button>
                    <Button
                        onPress={handleCheckOut}
                    >
                        Marcar salida
                    </Button>
                </View>

            </View>
        </SafeAreaView>
    );
}