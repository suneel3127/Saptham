import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "./styles";
import {WooCommerceAPI} from "../../api/api"
import MenuImage from "../../components/MenuImage/MenuImage";
import CartButton from "../../components/CartButton/CartButton";
import { getProducts , getUser, getStores } from "../../data/MockDataAPI";
import { useDispatch } from "react-redux";
import {setUser, setProducts, setStores} from "../../redux/slice";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase/config"
import { getDatabase, ref, get } from "firebase/database";

export default function HomeScreen(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(()=>{

   
    // const user = getUser();
    // dispatch(setUser(user.data.user))
    const db = getDatabase();
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (firebaseUser) => {
       
        if (firebaseUser) {
          const userId = firebaseUser.uid;
          const userRef = ref(db, 'users/' + userId);
          
          try {
            let snapshot = await get(userRef);  
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const user = userData
              console.log(userData);
              dispatch(setUser(userData));
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          setUser(null);
        }
      });
    };

    fetchUserData();

    const getStoresSnap = async () =>{
      let storesRef = ref(db, "Stores")
      console.log(storesRef);
      try {
        let snapshot = await get(storesRef);  
        if (snapshot.exists()) {
          let storeData = snapshot.val();
          console.log(storeData);
          dispatch(setStores(storeData));
        }
      } catch (error) {
        console.error('Error fetching Store data:', error);
      }
    }

    getStoresSnap();

    // const stores = getStores();
    // dispatch(setStores(stores.data.stores))
    
    const getProductsSnap = async () =>{
      let productsRef = ref(db, "Products")

      console.log(productsRef);
      try {
        let snapshot = await get(productsRef);  
        if (snapshot.exists()) {
          let productData = snapshot.val();
          console.log(productData);
          dispatch(setProducts(productData));
          setOriginalData(productData);
          setData(productData);
        }
      } catch (error) {
        console.error('Error fetching Products data:', error);
      }
    }
    getProductsSnap();
    // const response = getProducts();
    // dispatch(setProducts(response.data))
    
    
  },[]);

  const handleSearch = (text) => {
    setValue(text);
    const filteredData=[];
    if (text !== "") {
      data.map(data => {
        if (data.name.toUpperCase().includes(text.toUpperCase())) {
          filteredData.push(data);
        }
      });
      setData(filteredData)
    } else {
      setData(originalData);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => (<CartButton
        onPress={() => {
          navigation.navigate("Cart"); 
        }}
      />)
    });
  }, []);

  const onPressProduct = (item) => {
    navigation.navigate("Product", { item });
  };

  const renderProducts = ({ item }) => (
    <View>
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressProduct(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.images[0].src }} />
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </TouchableHighlight>
    </View>
  );

  return (
    <View>
      <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              onChangeText={handleSearch}
              value={value}
            />
            <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
      </View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={data} renderItem={renderProducts} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
