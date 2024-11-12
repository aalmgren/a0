import React from 'react';
import { View, Text, Modal, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import styles from './RemainingItemsModal.styles';

export default function RemainingItemsModal({ visible, items, onClose }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Remaining Items</Text>
          <ScrollView>
            {items.map((item) => (
              <Card key={item.id} style={styles.modalItemCard}>
                <Card.Content>
                  <Text style={styles.itemText}>Product: {item.name}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Location: {item.location}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
          <Button mode="contained" onPress={onClose} style={styles.closeButton}>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
}
