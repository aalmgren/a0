import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModulesMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modules</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Picking')}
      >
        <Text style={styles.buttonText}>Picking</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Replenishment')}
      >
        <Text style={styles.buttonText}>Replenishment</Text>
      </TouchableOpacity>
      {/* Adicione mais botões aqui conforme necessário */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ModulesMenuScreen;
