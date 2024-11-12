import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Modal, Button } from 'react-native-paper';

const BarcodeScanner = ({ onScanned, visible, onClose }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if (onScanned) {
      onScanned(data);
    }
    onClose();
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text>No access to camera</Text>
        <Button onPress={() => BarCodeScanner.requestPermissionsAsync()}>
          Grant Permission
        </Button>
      </View>
    );
  }

  return (
    <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        <Button mode="contained" onPress={onClose} style={styles.closeButton}>
          Close
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center',
  },
  scannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  scanner: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    marginTop: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarcodeScanner;
