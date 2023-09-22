import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const productNumColumns = 2;
const PRODUCT_ITEM_HEIGHT = 200; // Adjust the height as needed
const PRODUCT_ITEM_MARGIN = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  productcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: PRODUCT_ITEM_MARGIN,
    width: (SCREEN_WIDTH - (productNumColumns * PRODUCT_ITEM_MARGIN / 2)) / productNumColumns, // Adjust width calculation
    height: PRODUCT_ITEM_HEIGHT + 75,
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  photo: {
    width: '100%',
    height: PRODUCT_ITEM_HEIGHT,
    borderRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderColor: 'black',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: 'grey',
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
  productPrice: {
    color: "#713c11",
  },
});

export default styles;
