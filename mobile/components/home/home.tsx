import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Input } from '@/components/Input';

import { useGlobalContext } from '@/context/GlobalContext';
import { useEmployees } from '@/queries/employees';
import { useLog } from '@/queries/manager';

export const Home = () => {

    const { user, dutyClient } = useGlobalContext();
    const [search, setSearch] = useState('');

    const { data: searchEmployees, isLoading: isSearchLoading } = useEmployees(search);
    const { data: employeeLog, isLoading: isLogLoading } = useLog();

    const formatTime = (datetime?: string) => {
        if (datetime == null)
            return 'n/a';
        return new Date(datetime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <View>

            <View className='py-4'>
                <Text className='text-2xl font-bold'>Bienvenido, {user?.name}</Text>
                <Text className='text-base font'>{dutyClient}</Text>
            </View>

            <View className='pb-4'>
                <Input
                    placeholder='Buscar empleado'
                    className=''
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {search && (
                <View>
                    <Text className='text-xl font-semibold text-neutral-600 py-4'>Resultados de la busqueda</Text>
                    {isSearchLoading && <Text className='text-base text-neutral-600 py-4'>Cargando...</Text>}
                    <ScrollView className='flex flex-col'>
                        {searchEmployees?.map((employee: any) => (
                            <TouchableOpacity
                                key={employee?.id}
                                onPress={() => { router.push(`/employee/${employee?.id}`) }}
                                className='flex flex-row justify-between border-t border-neutral-300 py-4'
                            >
                                <Text className='text-base'>{employee?.name}</Text>
                                <Text className='text-base'>{employee?.dni}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            {!search && (
                <View className='border rounded-md border-neutral-300 bg-white'>

                    <View className='border-b border-neutral-300' style={style.logRow}>
                        <Text className='font-bold flex-1'>Empleado</Text>
                        <Text className='font-bold flex-1 text-right'>Entrada</Text>
                        <Text className='font-bold flex-1 text-right'>Salida</Text>
                    </View>

                    <ScrollView className='flex flex-col gap-2'>

                        {employeeLog?.map((log: any) => (

                            <TouchableOpacity
                                key={log?.employee_id}
                                onPress={() => {
                                    if (user?.employee_id != log?.employee_id) {
                                        router.push(`/employee/${log?.employee_id}`)
                                    }
                                }}
                                className='border-b border-neutral-300'
                                style={style.logRow}
                            >
                                <Text className='flex-1 mr-4'>{log?.employee_name}</Text>
                                <Text className='flex-1 text-right'>{formatTime(log?.check_in_time)}</Text>
                                <Text className='flex-1 text-right'>{formatTime(log?.check_out_time)}</Text>
                            </TouchableOpacity>

                        ))}

                    </ScrollView>

                </View>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    logRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    }
})