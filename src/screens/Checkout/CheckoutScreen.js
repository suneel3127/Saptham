import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { useDispatch,useSelector } from "react-redux";
import AddressForm from '../Address/AddressForm';

import {setUser} from "../../redux/slice";

import { getDatabase, ref, set, get } from "firebase/database";

import BackButton from "../../components/BackButton/BackButton";

const CheckoutScreen= (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [deliverToHome, setDeliverToHome] = useState(true);
    const [pickUpAtStore, setPickUpAtStore] = useState(false);
    const [showAddressSection, setShowAddressSection] = useState(true);
    const [showStoreSection, setShowStoreSection] = useState(false);
    const user = useSelector((app) => app.state.userDetails);
    console.log(user)
    const stores = useSelector((app) => app.state.stores);
    const [isAddressModalVisible, setAddressModalVisible] = useState(false);
    const [addressOptionsVisibility, setAddressOptionsVisibility] = useState(
      user?user.shipping_address?.map(() => false):[]
    );
    const [storeOptionsVisibility, setStoreOptionsVisibility] = useState(
      stores.map(() => false)
    );
    const [selectedPaymentOption,setSelectedPaymentOption] = useState(false);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <BackButton
            onPress={() => {
              navigation.navigate("Cart", { key: Math.random() }); 
            }}
          />
        ),
        headerRight: () => <View />,
      });
    }, []);

    const handleAddNewAddress = () => {
      setAddressModalVisible(true);
    };

    const handleDeliverToHomePress = () => {
      setDeliverToHome(true);
      setPickUpAtStore(false);
      setShowAddressSection(true);
      setShowStoreSection(false);
    };

    const handlePickUpAtStorePress = () => {
      setDeliverToHome(false);
      setPickUpAtStore(true);
      setShowAddressSection(false);
      setShowStoreSection(true);
    };

    const toggleAddressOption = (index) => {
      let updatedVisibility =addressOptionsVisibility.map((x,i)=>{
          if(i==index){
              return !x
          }else{
              return false;
          }
      })
      setAddressOptionsVisibility(updatedVisibility);
    };
    const saveAddress = (address) =>{
      const timestamp = Date.now();
      const randomNum = Math.floor(Math.random() * 10000); // Adjust as needed
      const addressId=  `${timestamp}-${randomNum}`;
      const newAddress = {
        id: addressId,
        address: address,
      };
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user?.id); 
      const updatedShippingAddress = user.shipping_address
        ? [...user.shipping_address, newAddress]
        : [newAddress];
      const updatedUser = { ...user, shipping_address: updatedShippingAddress };
      set(userRef, updatedUser)
        .then(() => {
          console.log('User details updated successfully!');
          dispatch(setUser(updatedUser));
        })
        .catch((error) => {
          console.error('Error updating user details:', error);
        });
    }
    const toggleStoreOption = (index) => {
    
      let updatedVisibility =storeOptionsVisibility.map((x,i)=>{
        if(i==index){
            return !x
        }else{
            return false;
        }
    })
    setStoreOptionsVisibility(updatedVisibility);
  };
  const selectPaymentOption = ()=>{
      setSelectedPaymentOption(!selectedPaymentOption);
  }
  const continueToPayment = ()=>{
      
  }
  const navigateToLogin = () =>{
      navigation.navigate("Login"); 
    }
 if (user == null) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ marginBottom:20}}>Please login to checkout</Text>
          <TouchableOpacity  style={styles.loginButton}>
            <Text onPress={navigateToLogin} style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }

  
  
    return (
        <View style={styles.maincontainer}>
            <View style={styles.container}>
                <TouchableOpacity
                onPress={handleDeliverToHomePress}
                style={[
                    styles.option,
                    deliverToHome && styles.selectedOption,
                ]}
                >
                <Text style={[styles.optionText, deliverToHome && styles.selectedOptionText]}>Deliver to Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={handlePickUpAtStorePress}
                style={[
                    styles.option,
                    pickUpAtStore && styles.selectedOption,
                ]}
                >
                <Text style={[styles.optionText, pickUpAtStore && styles.selectedOptionText]}>Pick Up at Store</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {showAddressSection && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Select Address</Text>
                        {user?.shipping_address?.map((address, index) => (
                        <TouchableOpacity
                            key={address.id}
                            onPress={() => toggleAddressOption(index)}
                            style={[styles.addressOption, addressOptionsVisibility[index]&&styles.selectedOption]}
                        >
                            <Text style={[styles.addressOptionText,addressOptionsVisibility[index] && styles.selectedOptionText]}>{address.address}</Text>
                        </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                        onPress={() => handleAddNewAddress()}
                        style={styles.addAddressButton}
                        >
                        <Text style={styles.addAddressButtonText} >Add New Address</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {showStoreSection && (
                    <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Store</Text>
                    {stores.map((store, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => toggleStoreOption(index)}
                            style={[styles.storeOption, storeOptionsVisibility[index]&&styles.selectedOption]}
                        >
                            <Text style={[styles.storeOptionText,storeOptionsVisibility[index] && styles.selectedOptionText]}>{store.store_name}</Text>
                        </TouchableOpacity>
                        ))}
                    </View>
                )}
                
            </View>
            <View style={styles.container}>
            <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Select Payment</Text>
                        
                        <TouchableOpacity
                            onPress={() => selectPaymentOption()}
                            style={[styles.paymentOption, selectedPaymentOption && styles.selectedOption]}
                        >
                            <Text style={[styles.paymentOptionText,selectedPaymentOption && styles.selectedOptionText]}>Razor Pay</Text>
                        </TouchableOpacity>
                        
                        
            </View>
            </View>
            <View style={styles.container}>
            <TouchableOpacity
                        onPress={() => continueToPayment()}
                        style={styles.paymentButton}
                        >
                        <Text style={styles.paymentButtonText} >Continue To Payment</Text>
            </TouchableOpacity>
            </View>
            <AddressForm
                isVisible={isAddressModalVisible}
                onClose={() => setAddressModalVisible(false)}
                onSaveAddress={(newAddress) => {
                    saveAddress(newAddress);
                    setAddressModalVisible(false);          
                }}
            />                        
      </View>
    );
};

export default CheckoutScreen;
