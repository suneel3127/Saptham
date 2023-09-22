import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import styles from './styles';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase/config"
import { getDatabase, ref, set } from "firebase/database";



const RegisterScreen = (props) => {

  const { navigation, route } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      
      let response = await createUserWithEmailAndPassword(auth, email, password);
      writeUserData(response.user.uid,response.user.email, password)
      navigation.navigate("Login"); 
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };
  const backtoLogin = () => {
    navigation.navigate("Login"); 
  };

  const writeUserData = (userId, email, password) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    set(userRef, {
        id:userId,
        username:"",
        email :email,
        password : password,
        first_name :"",
        last_name :"",
        display_name :"",
        shipping_address :[],
        phone_number :"",
        account_creation_date :new Date().toDateString()
      });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username (Email)</Text>
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

      <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.backtoLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
