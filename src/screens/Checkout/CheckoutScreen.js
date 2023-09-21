import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { useDispatch,useSelector } from "react-redux";
import AddressForm from '../Address/AddressForm';

const CheckoutScreen= () => {
    const [deliverToHome, setDeliverToHome] = useState(true);
  const [pickUpAtStore, setPickUpAtStore] = useState(false);
  const [showAddressSection, setShowAddressSection] = useState(true);
  const [showStoreSection, setShowStoreSection] = useState(false);
  const user = useSelector((app) => app.state.userDetails);
  console.log(user)
  const stores = useSelector((app) => app.state.stores);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [addressOptionsVisibility, setAddressOptionsVisibility] = useState(
    user?.shipping_address?.map(() => false)
  );
  const [storeOptionsVisibility, setStoreOptionsVisibility] = useState(
    stores.map(() => false)
  );
  const [selectedPaymentOption,setSelectedPaymentOption] = useState(false);

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
                setAddressModalVisible(false);
                }}
            />                        
      </View>
    );
};

export default CheckoutScreen;
