import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    button: {
      backgroundColor: 'blue',
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

  export default styles;