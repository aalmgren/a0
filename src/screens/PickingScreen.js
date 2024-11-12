import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import i18n from '../i18n';
import BarcodeScanner from '../components/BarcodeScanner';
import ProgressBarComponent from '../components/ProgressBarComponent';
import styles from '../styles/PickingStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const initialPickingList = [
  { id: 1, name: i18n.t('product_a'), location: i18n.t('location_a'), quantity: 10 },
  { id: 2, name: i18n.t('product_b'), location: i18n.t('location_b'), quantity: 5 },
  { id: 3, name: i18n.t('product_c'), location: i18n.t('location_c'), quantity: 8 },
];

export default function PickingScreen() {
  const [step, setStep] = useState('welcome');
  const [barcode, setBarcode] = useState('');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const { theme } = useContext(ThemeContext);

  const currentProduct = currentProductIndex >= 0 && currentProductIndex < initialPickingList.length
    ? initialPickingList[currentProductIndex]
    : null;

  const handleBarcodeScanned = (scannedBarcode) => {
    setBarcode(scannedBarcode);
    setIsScanning(false);
    handleNextStep();
  };

  const handleNextStep = () => {
    if (step === 'welcome') {
      setStep('list');
    } else if (step === 'list') {
      setStep('location');
    } else if (step === 'location') {
      setStep('scanProduct');
    } else if (step === 'scanProduct') {
      if (currentProductIndex < initialPickingList.length - 1) {
        setCurrentProductIndex(currentProductIndex + 1);
        setStep('location');
      } else {
        setStep('completed');
      }
    }
  };

  const handlePreviousStep = () => {
    if (step === 'list') {
      setStep('welcome');
    } else if (step === 'location') {
      setStep('list');
    } else if (step === 'scanProduct') {
      if (currentProductIndex > 0) {
        setCurrentProductIndex(currentProductIndex - 1);
        setStep('location'); // Volta para a localização do produto anterior
      } else {
        setStep('list'); // Se for o primeiro produto, volta para a lista
      }
    } else if (step === 'completed') {
      setStep('scanProduct');
      setCurrentProductIndex(initialPickingList.length - 1);
    }
  };

  const renderStepContent = () => {
    return (
      <GestureHandlerRootView style={styles.container}>
        {/* Barra de Progresso Fixa */}
        <View style={localStyles.progressContainer}>
          <ProgressBarComponent current={currentProductIndex + 1} total={initialPickingList.length} />
        </View>

        {/* Componente de Câmera */}
        {isScanning && (
          <View style={localStyles.cameraContainer}>
            <BarcodeScanner
              visible={isScanning}
              onScanned={handleBarcodeScanned}
              onClose={() => setIsScanning(false)}
            />
          </View>
        )}

        {/* Detalhes do Produto */}
        {!isScanning && (
          <View style={localStyles.productDetailsContainer}>
            {step === 'welcome' && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.text}>{i18n.t('welcome_message')}</Text>
                  <Button onPress={() => setIsScanning(true)} title={i18n.t('start_scanning')} />
                </Card.Content>
              </Card>
            )}
            {step === 'list' && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.text}>{i18n.t('picking_list')}</Text>
                  {initialPickingList.map((item) => (
                    <Text key={item.id} style={[styles.cardText, { color: theme.colors.text }]}>
                      <Icon name="local-shipping" size={16} color={theme.colors.text} />{' '}
                      {`${item.name} - ${item.location} - ${i18n.t('quantity')}: ${item.quantity}`}
                    </Text>
                  ))}
                  <Button onPress={handleNextStep} title={i18n.t('start_picking')} />
                </Card.Content>
              </Card>
            )}
            {step === 'location' && currentProduct && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.text}>{`${i18n.t('go_to_location')}: ${currentProduct.location}`}</Text>
                  <Button onPress={() => setIsScanning(true)} title={i18n.t('scan_shelf_barcode')} />
                </Card.Content>
              </Card>
            )}
            {step === 'scanProduct' && currentProduct && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.text}>{`${i18n.t('scan_product')}: ${currentProduct.name}`}</Text>
                  <Button onPress={() => setIsScanning(true)} title={i18n.t('scan_product_barcode')} />
                </Card.Content>
              </Card>
            )}
            {step === 'completed' && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.text}>{i18n.t('picking_completed')}</Text>
                  <Button onPress={() => setStep('welcome')} title={i18n.t('return_to_start')} />
                </Card.Content>
              </Card>
            )}
          </View>
        )}

        {/* Barra de Navegação Fixa */}
        <View style={localStyles.navigationBar}>
          {step !== 'welcome' && (
            <Button onPress={handlePreviousStep} title={i18n.t('back')} color={theme.colors.secondary} />
          )}
          {step !== 'completed' && (
            <Button onPress={handleNextStep} title={i18n.t('next')} color={theme.colors.primary} />
          )}
        </View>
      </GestureHandlerRootView>
    );
  };

  return renderStepContent();
}

const localStyles = StyleSheet.create({
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  productDetailsContainer: {
    flex: 1,
    paddingTop: 50, // Ajusta para evitar sobreposição com a barra de progresso
    marginBottom: 20,
  },
  navigationBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
