import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const productNumColums = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 150;
const PRODUCT_ITEM_MARGIN = 20;

// 2 photos per width
export const ProductCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: PRODUCT_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
    height: PRODUCT_ITEM_HEIGHT + 75,
    backgroundColor: 'white',
    flex: 1,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
    height: PRODUCT_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});
