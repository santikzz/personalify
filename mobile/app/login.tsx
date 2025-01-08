
import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput } from 'react-native-paper';

import { useGlobalContext } from '@/context/GlobalContext';
import { authenticate } from '@/services/api';

export default function LoginScreen() {

    const { storeSession } = useGlobalContext();

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const token = await authenticate({
            username: username,
            password: password
        });
        setLoading(false);
        if (token) {
            storeSession(token);
            router.push('/(tabs)');
        } else {
            Alert.alert('Error', 'Usuario o contraseña incorrectos');
        }
    }

    return (
        <SafeAreaView className='h-full bg-white'>
            <View className='h-full p-4 flex flex-col justify-center'>
                <View className='flex flex-col gap-4'>
                    <Text className='text-2xl font-bold text-center'>INGRESO GERENTES</Text>
                    <TextInput
                        mode='outlined'
                        label='Usuario'
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        mode='outlined'
                        label='Contraseña'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Button
                        onPress={handleLogin}
                        mode='contained'
                        contentStyle={{ paddingVertical: 6 }}
                        icon={'login'}
                        loading={loading}
                    >
                        Ingresar
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
}