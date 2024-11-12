import React, { useState, useContext } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import i18n from '../i18n';
import BarcodeScanner from '../components/BarcodeScanner'; // Importe o componente de escaneamento
import styles from '../styles/PickingStyles'; // Importa os estilos do arquivo separado
import { ProgressBar } from 'react-native-paper';

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

    return (
      <View>
        <Text style={styles.progressText}>{i18n.t('progress')}: {currentProductIndex + 1} / {pickingList.length}</Text>
        <ProgressBar progress={(currentProductIndex + 1) / pickingList.length} color="#007BFF" />

        <View style={styles.card}>
          {step === 'welcome' && (
            <>
              <Text style={[styles.text, { color: theme.colors.text }]}>{i18n.t('welcome_message')}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setIsScanning(true)}>
                <Icon name="qr-code-scanner" size={20} color="#fff" />
                <Text style={styles.buttonText}>{i18n.t('start_scanning')}</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 'list' && (
            <>
              <Text style={[styles.text, { color: theme.colors.text }]}>{i18n.t('picking_list')}</Text>
              {pickingList.map((item) => (
                <Text key={item.id} style={[styles.cardText, { color: theme.colors.text }]}>
                  <Icon name="local-shipping" size={16} color={theme.colors.text} />{' '}
                  {`${item.produto} - ${item.localizacao} - ${i18n.t('quantity')}: ${item.quantidade}`}
                </Text>
              ))}
              <TouchableOpacity style={styles.button} onPress={handleNextStep}>
                <Icon name="play-arrow" size={20} color="#fff" />
                <Text style={styles.buttonText}>{i18n.t('start_picking')}</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 'location' && (
            <>
              <Text style={[styles.text, { color: theme.colors.text }]}>
                {i18n.t('go_to_location')}: {currentProduct.localizacao}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => setIsScanning(true)}>
                <Icon name="qr-code-scanner" size={20} color="#fff" />
                <Text style={styles.buttonText}>{i18n.t('scan_shelf_barcode')}</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 'scanProduct' && (
            <>
              <Text style={[styles.text, { color: theme.colors.text }]}>
                {i18n.t('scan_product')}: {currentProduct.produto}
              </Text>
              <TouchableOpacity style={styles.button} onPress={() => setIsScanning(true)}>
                <Icon name="qr-code-scanner" size={20} color="#fff" />
                <Text style={styles.buttonText}>{i18n.t('scan_product_barcode')}</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 'completed' && (
            <>
              <Text style={[styles.text, { color: theme.colors.text }]}>{i18n.t('picking_completed')}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setStep('welcome')}>
                <Icon name="replay" size={20} color="#fff" />
                <Text style={styles.buttonText}>{i18n.t('return_to_start')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return <View style={styles.container}>{renderStepContent()}</View>;
}
