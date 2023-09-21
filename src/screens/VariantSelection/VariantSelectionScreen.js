import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import styles from "./styles";

const VariantSelectionScreen = ({ isVisible, onClose, onDone, variants }) => {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState([]);
  const [quantityOptions, setQuantityOptions] = useState([]);
  const variantnames = [...new Set(variants.map((item) => item.variant_name))];
  const [noOfItems, setNoofItems] = useState(0);

  const handleVariantChange = (value) => {
    setSelectedVariant(value);
    const availableQuantities = variants
      .filter((item) => item.variant_name === value)
      .map((item) => item.quantity);
    setQuantityOptions(availableQuantities);
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
            <View
              style={{
                backgroundColor: "white",
                padding: 16,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View style={styles.pickerContainer}>
                <Text>Select Variant</Text>
                <RNPickerSelect
                  onValueChange={(value) => handleVariantChange(value)}
                  items={variantnames.map((variant) => ({
                    label: variant,
                    value: variant,
                  }))}
                  defaultValue={variantnames[0]}
                  style={styles.pickerStyles} // Apply custom styles to the picker
                />
              </View>

              <View style={styles.pickerContainer}>
                <Text>Select Quantity</Text>
                <RNPickerSelect
                  onValueChange={(itemValue) => setSelectedQuantity(itemValue)}
                  items={quantityOptions.map((quantity) => ({
                    label: quantity,
                    value: quantity,
                  }))}
                  style={styles.pickerStyles} // Apply custom styles to the picker
                />
              </View>

              <View style={styles.pickerContainer}>
                <Text>Select Quantity</Text>
                <RNPickerSelect
                  onValueChange={(itemValue) => setNoofItems(itemValue)}
                  items={Array.from({ length: 10 }, (_, i) => ({
                    label: `${i + 1}`,
                    value: i + 1,
                  }))}
                  style={styles.pickerStyles} // Apply custom styles to the picker
                />
              </View>

              <TouchableOpacity
                style={styles.addtocartButton}
                onPress={() => onDone(selectedVariant, selectedQuantity, noOfItems)}
              >
                <Text style={styles.addtocartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default VariantSelectionScreen;
