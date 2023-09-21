import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import styles from "./styles";

const AddressForm = ({ isVisible, onClose, onSaveAddress }) => {
  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pinCode, setPinCode] = useState('');

  const handleSaveAddress = () => {
    // Validate each field
    if (!name || !streetAddress || !city || !state || !country || !pinCode) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    if (!/^\d+$/.test(pinCode)) {
      Alert.alert("Validation Error", "Pin code must contain only numbers.");
      return;
    }

    // Combine the values into a single comma-separated string
    const formData = `${name},${streetAddress},${city},${state},${country},${pinCode}`;
    
    // Pass the formData string to onSaveAddress
    onSaveAddress(formData);
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <TouchableWithoutFeedback>
            <View style={styles.addressFormContainer}>
              <Text style={styles.addressFormTitle}>Add New Address</Text>
              <TextInput
                style={styles.addressInput}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
              />
              <TextInput
                style={styles.addressInput}
                placeholder="Street address"
                onChangeText={(text) => setStreetAddress(text)}
                value={streetAddress}
              />
              <TextInput
                style={styles.addressInput}
                placeholder="City"
                onChangeText={(text) => setCity(text)}
                value={city}
              />
              <TextInput
                style={styles.addressInput}
                placeholder="State"
                onChangeText={(text) => setState(text)}
                value={state}
              />
              <TextInput
                style={styles.addressInput}
                placeholder="Country"
                onChangeText={(text) => setCountry(text)}
                value={country}
              />
              <TextInput
                style={styles.addressInput}
                placeholder="Pin Code"
                onChangeText={(text) => setPinCode(text)}
                value={pinCode}
              />
              <TouchableOpacity
                style={styles.saveAddressButton}
                onPress={handleSaveAddress}
              >
                <Text style={styles.saveAddressButtonText}>Save Address</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeAddressFormButton}
                onPress={onClose}
              >
                <Text style={styles.closeAddressFormButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddressForm;
