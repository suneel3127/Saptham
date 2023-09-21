import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  addAddressButton: {
    marginTop: 10,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  addAddressButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    marginBottom: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'black', // Change the background color as desired
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'white', // Change the text color as desired
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressOption: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addressOptionText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
