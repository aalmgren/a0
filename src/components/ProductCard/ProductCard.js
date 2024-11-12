import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import styles from './ProductCard.styles';

export default function ProductCard({ product }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.itemText}>Product: {product.name}</Text>
        <Text>Requested Quantity: {product.quantity}</Text>
        <Text>Location: {product.location}</Text>
      </Card.Content>
    </Card>
  );
}
