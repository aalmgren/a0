import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalItemCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
