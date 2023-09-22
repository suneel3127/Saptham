import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import styles from './styles';
import {  signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {auth} from "../../firebase/config"
import BackButton from "../../components/BackButton/BackButton";


const LoginScreen = (props) => {

  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.goBack();
      }
    });
    return () => unsubscribe();
  }, [navigation]);

  

  const handleLogin = async () => {
    try {
      let user = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully', user);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  const handleRegister = () => {
    navigation.navigate("Register"); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
