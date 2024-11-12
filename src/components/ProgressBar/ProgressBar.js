import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import styles from './ProgressBar.styles';

export default function ProgressBar({ progress, label, color }) {
  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} color={color} style={styles.progressBar} />
      <Text style={styles.progressText}>{label}</Text>
    </View>
  );
}
