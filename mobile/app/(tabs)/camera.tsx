import { Alert, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from 'react';
// import { Button } from '@/components/Button';
import { fetchEmployeeByDni } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Button, overlay } from 'react-native-paper';

export default function CameraScreen() {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text className='text-red-600 text-xl py-4 text-center'>Se necesita permisos de cámara</Text>
        <Button
          onPress={requestPermission}
          mode='contained'
          contentStyle={{ paddingVertical: 6 }}
        >
          Permitir cámara
        </Button>
      </View>
    );
  }

  const handleBarcodeScanned = async ({ type, data }: any) => {
    setScanned(true);
    try {
      console.log(data);
      const employee = await fetchEmployeeByDni(data);
      // console.log(employee);
      // console.log('id', employee?.id);
      if (employee) {
        router.push(`/employee/${employee?.id}`);
      }
    }
    catch (error) {
      Alert.alert('Error', 'No se pudo encontrar el empleado');
    }
  }

  return (
    <View style={styles.camera_container}>

      <CameraView
        style={styles.camera}
        facing='back'
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"]
        }}
      />

      <Button
        onPress={() => setScanned(false)}
        icon='qrcode-scan'
        mode='contained'
        contentStyle={{ paddingVertical: 6 }}
      >
        Toca para escanear
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  camera_container: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 16,
  },
  camera: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});