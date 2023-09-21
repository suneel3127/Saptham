import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import MenuImage from "../../components/MenuImage/MenuImage";
import { FontAwesome5 } from '@expo/vector-icons';
import { onAuthStateChanged , signOut} from "firebase/auth";
import {auth} from "../../firebase/config"
import { getDatabase, ref, set, get } from "firebase/database";
import AddressForm from '../Address/AddressForm';




const AccountScreen = (props) => {
  const { navigation } = props;
  const [user,setUser] = useState({});
  // const user = useSelector((app) => app.state.userDetails);
    useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (firebaseUser) => {
       
        if (firebaseUser) {
          const userId = firebaseUser.uid;
          const db = getDatabase();
          const userRef = ref(db, 'users/' + userId);
          
          try {
            const snapshot = await get(userRef);  
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setUser(userData);
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
  }, []);

  const [showAccountDetails, setShowAccountDetails] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const db = getDatabase();
  const userRef = ref(db, 'users/' + user?.id); 

  
  
  useLayoutEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
          <MenuImage
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      headerRight: () => <View />,
    });
  }, []);

  const navigateToLogin = () =>{
    navigation.navigate("Login"); 
  }

  const handleAccountDetailsPress = () => {
    setShowAccountDetails(!showAccountDetails);
  };

  const handleOrdersPress = () => {
    setShowOrders(!showOrders);
  };

  const handleAddressesPress = () => {
    setShowAddresses(!showAddresses);
  };

  const handleAddNewAddress = () => {
    setAddressModalVisible(true);
  };

  const saveAddress = (address) =>{
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000); // Adjust as needed
    const addressId=  `${timestamp}-${randomNum}`;
    const newAddress = {
      id: addressId,
      address: address,
    };
    const updatedShippingAddress = user.shipping_address
      ? [...user.shipping_address, newAddress]
      : [newAddress];
    const updatedUser = { ...user, shipping_address: updatedShippingAddress };
    set(userRef, updatedUser)
      .then(() => {
        console.log('User details updated successfully!');
        setUser(updatedUser);
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
      });
  }

  const handleLogoutPress = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigation.navigate('Login'); // Navigate to the login screen (or any other screen)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const handleSaveAccountDetails = () => {
    set(userRef, user)
      .then(() => {
        console.log('User details updated successfully!');
        setUser(user);
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
      });
  };

  const renderAccountDetails = () => {
    return (
        <View style={styles.section}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name:</Text>
          <TextInput
            style={styles.inputField}
            value={user.first_name}
            onChangeText={(text) => setUser({ ...user, first_name: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name:</Text>
          <TextInput
            style={styles.inputField}
            value={user.last_name}
            onChangeText={(text) => setUser({ ...user, last_name: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.inputField}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveAccountDetails}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderOrders = () => {
   
    const orders = []; 
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Orders</Text>
        {orders?.length > 0 ? (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text>{item.orderDate}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text>No orders found.</Text>
        )}
      </View>
    );
  };

  const renderAddresses = () => {
    
    const addresses = user.shipping_address;

    return (
      <View style={styles.section}>
        
        {addresses?.length > 0 ? (
            addresses.map((address, index) => (
                        <TouchableOpacity
                            key={address.id}
                            style={styles.addressOption}
                        >
                            <Text style={styles.addressOptionText}>{address.address}</Text>
                        </TouchableOpacity>
            ))
        ) : (
          <Text>No addresses found.</Text>
        )}
        <TouchableOpacity
          onPress={() => handleAddNewAddress()}
          style={styles.addAddressButton}
        >
          <Text style={styles.addAddressButtonText} >Add Address</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLogoutButton = () => {
    return (
      <TouchableOpacity onPress={handleLogoutPress} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    );
  };

  if (user == null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity  style={styles.loginButton}>
          <Text onPress={navigateToLogin} style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={handleAccountDetailsPress}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>
          Account Details
        </Text>
        <FontAwesome5
            name={showAccountDetails ? 'chevron-down' : 'chevron-up'} // Toggle between down and up arrow
            size={18}
            color="black"
            style={{ marginRight: 8 }}
          />
      </TouchableOpacity>
      <Collapsible collapsed={!showAccountDetails}>{renderAccountDetails()}</Collapsible>

      <TouchableOpacity onPress={handleOrdersPress} style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Orders</Text>
        <FontAwesome5
            name={showOrders ? 'chevron-down' : 'chevron-up'} // Toggle between down and up arrow
            size={18}
            color="black"
            style={{ marginRight: 8 }}
          />
      </TouchableOpacity>
      <Collapsible collapsed={!showOrders}>{renderOrders()}</Collapsible>

      <TouchableOpacity onPress={handleAddressesPress} style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Addresses</Text>
        <FontAwesome5
            name={showAddresses ? 'chevron-down' : 'chevron-up'} // Toggle between down and up arrow
            size={18}
            color="black"
            style={{ marginRight: 8 }}
          />
      </TouchableOpacity>
      <Collapsible collapsed={!showAddresses}>{renderAddresses()}</Collapsible>

      </ScrollView>

      {renderLogoutButton()}
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

export default AccountScreen;
