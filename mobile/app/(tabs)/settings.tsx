import { useGlobalContext } from '@/context/GlobalContext';
import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {

  const { user, clearSession } = useGlobalContext();

  return (
    <SafeAreaView className='h-full bg-white'>

      <View className='flex flex-col gap-4 p-4'>

        <Card>
          <Card.Title title='Usuario' />
          <Card.Content>
            <Text>Gerente: {user?.name}</Text>
          </Card.Content>
        </Card>

        <Button
          onPress={clearSession}
          mode='contained'
          icon='logout'
          contentStyle={{ paddingVertical: 6 }}
        >
          Cerrar sesion
        </Button>
        
      </View>

    </SafeAreaView>
  );
}