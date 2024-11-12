import React, { useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import i18n from '../i18n';
import BarcodeScanner from '../components/BarcodeScanner';
import ProgressBarComponent from '../components/ProgressBarComponent';
import styles from '../styles/PickingStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card } from 'react-native-paper';

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

  console.log('Current Step:', step);
  console.log('Current Product Index:', currentProductIndex);

  const currentProduct = currentProductIndex >= 0 && currentProductIndex < initialPickingList.length
    ? initialPickingList[currentProductIndex]
    : null;

  const handleBarcodeScanned = (scannedBarcode) => {
    console.log('Barcode scanned:', scannedBarcode);
    setBarcode(scannedBarcode);
    setIsScanning(false);
    handleNextStep();
  };

  const handleNextStep = () => {
    console.log('handleNextStep called, current step:', step);
    if (step === 'welcome') {
      setStep('list');
    } else if (step === 'list') {
      setStep('location');
    } else if (step === 'location') {
      setStep('scanProduct');
    } else if (step === 'scanProduct') {
      if (currentProductIndex < initialPickingList.length - 1) {
        console.log('Advancing to next product...');
        setCurrentProductIndex(currentProductIndex + 1);
        setStep('location');
      } else {
        console.log('Completed all products');
        setStep('completed');
      }
    }
  };

  const renderStepContent = () => {
    console.log('Rendering content for step:', step);
    if (isScanning) {
      console.log('Barcode scanner active');
      return (
        <BarcodeScanner
          visible={isScanning}
          onScanned={handleBarcodeScanned}
          onClose={() => {
            console.log('Scanner closed');
            setIsScanning(false);
          }}
        />
      );
    }

    return (
      <View>
        <ProgressBarComponent current={currentProductIndex + 1} total={initialPickingList.length} />
        {step === 'welcome' && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>{i18n.t('welcome_message')}</Text>
              <Button onPress={() => {
                console.log('Start scanning pressed');
                setIsScanning(true);
              }} title={i18n.t('start_scanning')} />
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
              <Button onPress={() => {
                console.log('Start picking pressed');
                handleNextStep();
              }} title={i18n.t('start_picking')} />
              <Button onPress={() => {
                console.log('Rescan list pressed');
                setIsScanning(true);
              }} title={i18n.t('rescan_list')} color="red" />
            </Card.Content>
          </Card>
        )}
        {step === 'location' && currentProduct && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>{`${i18n.t('go_to_location')}: ${currentProduct.location}`}</Text>
              <Button onPress={() => {
                console.log('Scan shelf barcode pressed');
                setIsScanning(true);
              }} title={i18n.t('scan_shelf_barcode')} />
            </Card.Content>
          </Card>
        )}
        {step === 'scanProduct' && currentProduct && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>{`${i18n.t('scan_product')}: ${currentProduct.name}`}</Text>
              <Button onPress={() => {
                console.log('Scan product barcode pressed');
                setIsScanning(true);
              }} title={i18n.t('scan_product_barcode')} />
            </Card.Content>
          </Card>
        )}
        {step === 'completed' && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>{i18n.t('picking_completed')}</Text>
              <Button onPress={() => {
                console.log('Return to start pressed');
                setStep('welcome');
              }} title={i18n.t('return_to_start')} />
            </Card.Content>
          </Card>
        )}
      </View>
    );
  };

  return <View style={styles.container}>{renderStepContent()}</View>;
}
