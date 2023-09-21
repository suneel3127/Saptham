import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth,height } = Dimensions.get('window');

const styles = StyleSheet.create({
    pickerContainer: {
      marginBottom: 16, // Add margin between pickers
    },
    pickerStyles : {
        inputIOS: {
          borderWidth: 1, // Add border width
          borderColor: "gray", // Border color
          borderRadius: 4, // Border radius
          paddingVertical: 12, // Vertical padding
          paddingHorizontal: 10, // Horizontal padding
          fontSize: 16, // Font size
          color: "black", // Text color
        },
        inputAndroid: {
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 4,
          paddingVertical: 8,
          paddingHorizontal: 10,
          fontSize: 16,
          color: "black",
        },
      },
      addtocartButton: {
        backgroundColor: "black",
        padding: 8,
        margin:40,
        borderRadius: 5,
      },
      addtocartButtonText: {
        color: "white",
      },
  });

export default styles;
