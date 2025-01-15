import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalContext';
import { Home } from '@/components/home/home';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.main}>
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    height: '100%',
    backgroundColor: 'white',
  }
});