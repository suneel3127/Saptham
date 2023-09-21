import React, { useState,useLayoutEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import CartItem from "./CartItem";
import { useSelector } from 'react-redux';
import BackButton from "../../components/BackButton/BackButton";
import styles from "./styles";


export default function CartScreen(props) {
    const { navigation } = props;
    const cartItems = useSelector((app) => app.state.cartItems);


  const calculateTotalPrice = () => {
    return Math.round(cartItems.reduce((total, item) => total + (item.price*item.noOfItems), 0));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const navigateToCheckout = ()=>{
    navigation.navigate("Checkout"); 
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>

      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
            />
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View>
        <View style={styles.summaryContainer}>
            <Text style={styles.summaryHeading}>Order Summary</Text>
            <View style={styles.summaryItem}>
              <Text>Subtotal:</Text>
              <Text>{calculateTotalPrice().toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text>Taxes:</Text>
              <Text>0</Text>
            </View> 
           <View style={styles.summaryItem}>
              <Text>Shipping:</Text>
              <Text>0</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text>Discounts:</Text>
              <Text>-0</Text>
            </View>
            <View style={styles.summaryTotal}>
              <Text>Total:</Text>
              <Text>{calculateTotalPrice().toFixed(2)}</Text>
            </View>
            <View style={styles.btncontainer}>
            <Text style={styles.btntext} onPress={navigateToCheckout}>Check Out</Text>
          </View>
          </View>
          
        </View>
      )}
    </View>
  );
}