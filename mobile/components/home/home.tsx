import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalContext';
import { useEmployees } from '@/queries/employees';
import { useLog } from '@/queries/manager';
import { DataTable, Searchbar } from 'react-native-paper';

export const Home = () => {

    const { user } = useGlobalContext();
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

            <View className='pt-4'>
                <Text className='text-2xl font-bold'>Bienvenido, {user?.name}</Text>
            </View>

            <View className='py-4'>
                <Searchbar
                    placeholder='Buscar empleado ...'
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {search && (
                <View>
                    <Text className='text-xl font-semibold text-neutral-600 py-4'>Resultados de la busqueda</Text>
                    {isSearchLoading && <Text className='text-base text-neutral-600 py-4'>Cargando...</Text>}
                    <ScrollView style={style.searchList}>
                        {searchEmployees?.map((employee: any) => (
                            <TouchableOpacity
                                key={employee?.id}
                                style={style.searchRow}
                                onPress={() => { router.push(`/employee/${employee?.id}`) }}
                            >
                                <Text className='text-xl'>{employee?.name}</Text>
                                <Text className='text-xl'>{employee?.dni}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}

            {!search && (
                <View className='border rounded-md border-neutral-300 bg-white'>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Empleado</DataTable.Title>
                            <DataTable.Title numeric>Entrada</DataTable.Title>
                            <DataTable.Title numeric>Salida</DataTable.Title>
                        </DataTable.Header>
                        {isLogLoading && <Text className='text-center py-4'>Cargando...</Text>}
                        {employeeLog?.length == 0 && <Text className='text-center py-4'>Sin entradas.</Text>}
                        {employeeLog?.map((log: any) => (
                            <DataTable.Row key={log?.id} onPress={() => { router.push(`/employee/${log?.employee_id}`) }}>
                                <DataTable.Cell>{log?.employee_name}</DataTable.Cell>
                                <DataTable.Cell numeric>{formatTime(log?.check_in_time)}</DataTable.Cell>
                                <DataTable.Cell numeric>{formatTime(log?.check_out_time)}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>
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
    },
    searchList: {
        display: 'flex',
        flexDirection: 'column',
    },
    searchRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#d4d4d4',
    }
})