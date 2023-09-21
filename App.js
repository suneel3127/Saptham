import React ,{useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';

import { setPersistence, browserLocalPersistence} from 'firebase/auth';
import {auth} from "./src/firebase/config"


export default function App() {

  useEffect(()=>{
    // const enableSessionPersistence = async () => {
    //   try {
    //     await setPersistence(auth, browserLocalPersistence);
    //   } catch (error) {
    //     console.error('Error enabling session persistence:', error);
    //   }
    // };
    // enableSessionPersistence();
  },[]);

  return (
    <Provider store={store}>
     <AppContainer />
     </Provider>
  );
}
