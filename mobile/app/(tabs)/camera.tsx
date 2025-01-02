import { Alert, Text, StyleSheet, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CameraView, Camera, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from 'react';

export default function CameraScreen() {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text className='text-red-600'>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }: any) => {
    setScanned(true);
    Alert.alert('QR Scanned', `Type: ${type}, Data: ${data}`);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing='back'
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"]
        }}
      />

      <Button title={"Toca para escanear"} onPress={() => setScanned(false)} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
});