import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    addressFormContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        elevation: 4,
      },
      addressFormTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      addressInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      saveAddressButton: {
        backgroundColor: 'white', // Change to your desired button color
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
      },
      saveAddressButtonText: {
        color: 'black', // Change to your desired text color
        fontWeight: 'bold',
      },
      closeAddressFormButton: {
        backgroundColor: 'white', // Change to your desired button color
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
      },
      closeAddressFormButtonText: {
        color: 'black', // Change to your desired text color
        fontWeight: 'bold',
      },
  });

export default styles;
