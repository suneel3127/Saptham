import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../redux/slice";
import styles from "./styles";

const CartItem = ({item}) => {
    const dispatch = useDispatch();
    
    const removeFromCart = () => {
      dispatch(removeItemFromCart(item));
    };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.images[0].src  }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: {Math.round(item.noOfItems*item.price)}</Text>
        <Text style={styles.itemQuantity}>{item.variant_name}: {item.noOfItems} * {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={removeFromCart} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem