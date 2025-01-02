
import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalContext } from '@/context/GlobalContext';
import { authenticate } from '@/services/api';
import { Input } from '@/components/Input';

export default function LoginScreen() {

    const { storeSession } = useGlobalContext();

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');

    const handleLogin = async () => {
        const token = await authenticate({
            username: username,
            password: password
        });
        if (token) {
            storeSession(token);
            router.push('/(tabs)');
        }else{
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
    }

    return (
        <SafeAreaView className='min-h-screen w-full bg-neutral-100'>

            <View className='max-w-[90vw] mx-auto my-auto p-6 flex flex-col gap-4'>

                <View className='pb-2'>
                    <Text className='text-2xl font-bold text-center'>INGRESO GERENTES</Text>
                </View>

                <View className='flex flex-col gap-2'>
                    <Text>Usuario</Text>
                    <Input
                        className='flex border border-neutral-400 px-4 text-base text-black rounded-md'
                        placeholder='usuario'
                        onChangeText={setUsername}
                        value={username}
                    />
                </View>

                <View className='flex flex-col gap-2'>
                    <Text>Contraseña</Text>
                    <Input
                        className='flex border border-neutral-400 px-4 text-base text-black rounded-md'
                        placeholder='contraseña'
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    className='bg-neutral-950 p-4 rounded-md flex items-center justify-center'

                >
                    <Text className='text-white text-base text-center'>Ingresar {">"}</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}