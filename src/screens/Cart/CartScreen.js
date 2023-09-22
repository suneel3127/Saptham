import React, { useState,useLayoutEffect, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from 'react-redux';
import BackButton from "../../components/BackButton/BackButton";
import styles from "./styles";
import { getDatabase, ref, push, get ,set, query, equalTo} from "firebase/database";
import { emptyCart, removeItemFromCart } from "../../redux/slice";

export default function CartScreen(props) {
  const { navigation, route } = props;
  const refreshKey = route.params?.key;
  const db = getDatabase();
  const dispatch = useDispatch();
  let cartItemsAnonymous = useSelector((app) => app.state.cartItems);
  const [cartItems, setCartItems] = useState([]);
  const user = useSelector((app) => app.state.userDetails);
  const productVariants = useSelector((app) => app.state.productVariants);
  const products = useSelector((app) => app.state.products);
  const [userCartId, setUserCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    
      if(user){
        console.log("reloaded --- userPresent")
      findCartItems(user.id)
      .then((cartItems) => {
        setCartItems(cartItems);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("reloaded")
        console.error('Error finding cart items', error);
      });
    }else{
      setCartItems(cartItemsAnonymous);
       setIsLoading(false);
    }
  }, [refreshKey]);
  useEffect(() => {
    if(user == null){
    setCartItems(cartItemsAnonymous);
    }
}, [cartItemsAnonymous]);

  const addToExistingCart = async (newItem, cartId) => {
    try {
      const cartItemsRef = ref(db, "ShoppingCartItems");
      const snapshot = await get(cartItemsRef);
      if (snapshot.exists()) {
        let cartItems = snapshot.val();
        const cartItemsArray = Object.values(cartItems); 
        const existingItem = cartItemsArray.find((item) => 
        item.cart_id === cartId && item.product_id === newItem.id
        );
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
          await set(ref(db, `ShoppingCartItems/${existingItem.id}`), existingItem);
          return existingItem.id;
        }
      }
      const newCartItemRef = push(cartItemsRef);
      const newCartItemKey = newCartItemRef.key;
      const newCartItem = {
        id: newCartItemKey,
        cart_id: cartId,
        product_id: newItem.id,
        quantity: newItem.quantity,
        images:newItem.images,
        name:newItem.name,
        price:newItem.price,
        variant_quantity:newItem.variant_quantity,
        variant_name:newItem.variant_name
      };
      await set(newCartItemRef, newCartItem);
    } catch (error) {
      console.error("Error adding a cart item:", error);
      throw error;
    }
  };

  const findCartItems = async (userId) => {
    const existingCart = await findCartByUserId(userId);
    if (existingCart) {
      setUserCartId(existingCart.id);
      console.log("cartItemsAnonymous --- ", cartItemsAnonymous)
      if(cartItemsAnonymous.length>0){
        const addToCartPromises = cartItemsAnonymous.map(async (item) => {
          console.log("existing cart item ---", item);
          await addToExistingCart(item, existingCart.id);
        });
        await Promise.all(addToCartPromises);
        dispatch(emptyCart())
      }
      const cartItems = await findCartItemsBasedOnCart(existingCart.id);
      return cartItems;
    } else {
      return [];
    }
  };

  const findCartByUserId = async (userId) => {
    const cartsRef = ref(db, "ShoppingCarts"); 
    try {
      const snapshot = await get(cartsRef);
      if (snapshot.exists()) {
        const allCarts = snapshot.val();
        const cart = Object.values(allCarts).filter(
          (cart) => cart.user_id === userId
         )[0];
         return cart;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding cart by user ID:", error);
      throw error;
    }
  };

  const findCartItemsBasedOnCart = async (cartId) => {
    try {
      const cartItemsRef = ref(db, "ShoppingCartItems");
      const snapshot = await get(cartItemsRef);
      if (snapshot.exists()) {
        let cartItems = snapshot.val();
        const cartItemsArray = Object.values(cartItems); 
        return cartItemsArray;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding  cart items:", error);
      throw error;
    }
  };
  

  const removeItemFromCart = async(id) =>{
    if (user){
    const cartItemsRef = ref(db, `ShoppingCartItems/${id}`);
    try {
      await set(cartItemsRef, null);
      const updatedCartItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCartItems);
      if (updatedCartItems.length === 0) {
        await deleteCartFromDatabase(userCartId); 
      }
    } catch (error) {
      console.error('Error removing item from database:', error);
      throw error;
    }}else{
      console.log("Cartitems ----", cartItemsAnonymous)
      console.log("id ----", id)
      dispatch(emptyCart())
    }
  }
  const deleteCartFromDatabase = async (cartId) => {
    try {
      const cartsRef = ref(db, `ShoppingCarts/${cartId}`);
      
      await set(cartsRef,null);
  
      console.log(`Cart with ID ${cartId} deleted successfully from the database.`);
    } catch (error) {
      console.error(`Error deleting cart with ID ${cartId} from the database:`, error);
      throw error;
    }
  };

  const calculateTotalPrice = () => {
    return Math.round(cartItems.reduce((total, item) => total + (item.price*item.quantity), 0));
  };

  const navigateToCheckout = ()=>{
    navigation.navigate("Checkout"); 
  }
 

  

  return (
   
      
    <View style={{ flex: 1, padding: 16 , backgroundColor:'white'}}>

      {
        isLoading?
          <ActivityIndicator /> 
        :
        cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
        ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              removeItemFromCart={removeItemFromCart}
            />
          )}
        />
        )
      }

      {!isLoading && cartItems.length > 0 && (
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