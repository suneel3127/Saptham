import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
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
    loginButton:{
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
      alignItems: 'center',
      width:'80%',
    },
    registerButton:{
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 10,
      alignItems: 'center',
      width:'80%',
    }
  });

  export default styles;