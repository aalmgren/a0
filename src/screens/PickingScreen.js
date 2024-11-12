import React, { useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import i18n from '../i18n';
import BarcodeScanner from '../components/BarcodeScanner'; // Importe o componente de escaneamento
import styles from '../styles/styles'; // Importe os estilos do arquivo separado

const pickingList = [
  { id: 1, produto: i18n.t('product_a'), localizacao: i18n.t('location_a'), quantidade: 10 },
  { id: 2, produto: i18n.t('product_b'), localizacao: i18n.t('location_b'), quantidade: 5 },
  { id: 3, produto: i18n.t('product_c'), localizacao: i18n.t('location_c'), quantidade: 8 },
];

export default function PickingScreen() {
  const [step, setStep] = useState('welcome');
  const [barcode, setBarcode] = useState('');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const currentProduct = pickingList[currentProductIndex];

  const handleNextStep = () => {
    if (step === 'welcome') {
      setStep('list');
    } else if (step === 'list') {
      setStep('location');
    } else if (step === 'location') {
      setStep('scanProduct');
    } else if (step === 'scanProduct') {
      if (currentProductIndex < pickingList.length - 1) {
        setCurrentProductIndex(currentProductIndex + 1);
        setStep('location');
      } else {
        setStep('completed');
      }
    }
  };

  const handleBarcodeScanned = (scannedBarcode) => {
    setBarcode(scannedBarcode);
    setIsScanning(false); // Fecha o scanner

    // Avança para a próxima etapa independentemente do código escaneado
    handleNextStep();
  };

  const renderStepContent = () => {
    if (isScanning) {
      return (
        <BarcodeScanner
          visible={isScanning}
          onScanned={handleBarcodeScanned}
          onClose={() => setIsScanning(false)}
        />
      );
    }

    switch (step) {
      case 'welcome':
        return (
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.text }]}>{i18n.t('welcome_message')}</Text>
            <Button title={i18n.t('start_scanning')} onPress={() => setIsScanning(true)} />
          </View>
        );
      case 'list':
        return (
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.text }]}>{i18n.t('picking_list')}</Text>
            {pickingList.map((item) => (
              <Text key={item.id} style={{ color: theme.colors.text }}>
                {`${item.produto} - ${item.localizacao} - ${i18n.t('quantity')}: ${item.quantidade}`}
              </Text>
            ))}
            <Button title={i18n.t('start_picking')} onPress={handleNextStep} />
          </View>
        );
      case 'location':
        return (
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.text }]}>
              {i18n.t('go_to_location')}: {currentProduct.localizacao}
            </Text>
            <Button title={i18n.t('scan_shelf_barcode')} onPress={() => setIsScanning(true)} />
          </View>
        );
      case 'scanProduct':
        return (
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.text }]}>
              {i18n.t('scan_product')}: {currentProduct.produto}
            </Text>
            <Button title={i18n.t('scan_product_barcode')} onPress={() => setIsScanning(true)} />
          </View>
        );
      case 'completed':
        return (
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.text }]}>{i18n.t('picking_completed')}</Text>
            <Button title={i18n.t('return_to_start')} onPress={() => setStep('welcome')} />
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderStepContent()}</View>;
}
