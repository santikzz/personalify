import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalContext } from '@/context/GlobalContext';
import { Welcome } from '@/components/home/welcome';
import { Home } from '@/components/home/home';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {

  const { user, onDuty } = useGlobalContext();

  return (
    <SafeAreaView style={styles.main}>

      {!onDuty ? <Welcome /> : <Home />}

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