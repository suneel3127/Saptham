import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    image: {
      width: 80,
      height: 80,
      marginRight: 16,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
    },
    itemPrice: {
      fontSize: 14,
      color: "#888",
    },
    itemQuantity: {
      fontSize: 14,
    },
    removeButton: {
      backgroundColor: "black",
      padding: 8,
      borderRadius: 5,
    },
    removeButtonText: {
      color: "white",
    },
    btncontainer: {
    
      height: 50,
      margin:30,
      borderRadius: 100,
      borderColor: '#2cd18a',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btntext: {
      fontSize: 14,
      color: '#2cd18a'
    },
    summaryContainer: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 16,
      margin: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    summaryHeading: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },
    summaryItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    summaryTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      paddingTop: 8,
    },
    ActivityLoaderCont:{
      flex: 1,
      justifyContent: 'center',
    }
  });

  export default styles;