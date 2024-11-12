import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import styles from '../styles/ProgressBarStyles';

export default function ProgressBarComponent({ current, total }) {
  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        {`Progress: ${current} / ${total}`}
      </Text>
      <ProgressBar progress={current / total} color="#007BFF" />
    </View>
  );
}
