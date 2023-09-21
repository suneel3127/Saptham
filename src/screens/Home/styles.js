import { StyleSheet } from 'react-native';
import { ProductCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: ProductCard.container,
  photo: ProductCard.photo,
  title: {
    flex: 0.5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: ProductCard.category,
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "white", 
    borderRadius: 10, 
    width: "90%",
    marginLeft:20,
    marginTop:10,
    borderColor:"grey"
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: 'grey' 
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    color: "black",
    width: "80%",
    height: 50,
    marginLeft:10,
  },
  productPrice: {
    color: "#713c11"
  }
});

export default styles;
