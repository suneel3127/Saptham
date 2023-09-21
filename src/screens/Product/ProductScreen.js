import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {  ScrollView, Text, View,  Image,  Dimensions,  TouchableHighlight,  TouchableOpacity } from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import BackButton from "../../components/BackButton/BackButton";
import CartButton from "../../components/CartButton/CartButton";
import { addItemToCart, setVariants, setReviews } from "../../redux/slice";
import { useDispatch,useSelector } from "react-redux";
import VariantSelectionScreen from "../VariantSelection/VariantSelectionScreen";
import HTML from "react-native-render-html";
import ReviewItem from "./ReviewItem";
import {auth} from "../../firebase/config"
import { getDatabase, ref, get } from "firebase/database";


const { width: viewportWidth } = Dimensions.get("window");

export default function ProductScreen(props) {

  const { navigation, route } = props;
  const dispatch = useDispatch();
  const item = route.params?.item;
  const screen = Dimensions.get('window');
  const contentWidth = screen.width;  
  const [activeSlide, setActiveSlide] = useState(0);
  const slider1Ref = useRef();
  const cartItems = useSelector((app) => app.state.cartItems);
  const [productReviews,setProductReviews] = useState([]);
  const [itemVariants, setItemVariants] = useState([]);
  const [isVariantSelectionVisible, setVariantSelectionVisible] = useState(false);


  useEffect(()=>{
    const db = getDatabase();
    const getProductVariantsSnap = async (parentProductId) =>{
      let productVariantsRef = ref(db, "ProductVariants")
      try {
        let variantSnapshot = await get(productVariantsRef); 
        if (variantSnapshot.exists()) {
          const allVariants = variantSnapshot.val();
          const variants = Object.values(allVariants).filter(
           (variant) => variant.parent_product_id === parentProductId
          );
          setItemVariants(variants);
          dispatch(setVariants(variants));
        }
      } catch (error) {
        console.error('Error fetching Variants data:', error);
      }
    }
    getProductVariantsSnap(item.id);

    const getProductReviewsSnap = async (productId) =>{
      let productReviewsRef = ref(db, "ProductReviews")
      try { 
        let reviewsSnapshot = await get(productReviewsRef);  
        if (reviewsSnapshot.exists()) {
          let allReviews = reviewsSnapshot.val();
          let reviews = Object.values(allReviews).filter(
            (review) => review.product_id === productId
           );
          setProductReviews(reviews)
          dispatch(setReviews(reviews));
        }
      } catch (error) {
        console.error('Error fetching Reviews data:', error);
      }
    }
    getProductReviewsSnap(item.id);
  },[])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => (<CartButton
        onPress={() => {
          navigation.navigate("Cart"); 
        }}
      />
      ),
    });
  }, []);

  

  const showVariantSelection = () => {
    setVariantSelectionVisible(true);
  };
  const onVariantSelectionClose =()=>{
    setVariantSelectionVisible(false);
  }
  const calculateAverageReview = ()=>{
    let totalRating = productReviews.reduce((total, review) => total + review.rating, 0);
    let averageRating = totalRating / productReviews.length;
    return averageRating;
  }

  const handleVariantSelectionDone = (selectedVariantName, selectedVariantQuantity, noOfItems) => {
    const selectedVariant = itemVariants.filter((x) => x.variant_name === selectedVariantName && x.quantity == selectedVariantQuantity)[0]
    const itemIndex = cartItems.findIndex((x) => x.id === selectedVariant.id);
    if (itemIndex !== -1) {
      const updatedCartItem = { ...cartItems[itemIndex] };
      updatedCartItem.noOfItems += noOfItems;
      console.log(updatedCartItem);
      dispatch(addItemToCart(updatedCartItem));
    } else {
      const cartItem = { ...selectedVariant, noOfItems, images:item.images, name:item.name};
      console.log(cartItem);
      dispatch(addItemToCart(cartItem));
    }
    setVariantSelectionVisible(false);
  };

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.src }} />
      </View>
    </TouchableHighlight>
  );
  
  
  return (
    <View>
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.images}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(0)}
          />
          <Pagination
            dotsLength={item.images.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tstateableDots={!!slider1Ref.current}
          />
        </View>
      </View>
      <View style={styles.infoProductContainer}>
        <Text style={styles.infoProductName}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <TouchableHighlight underlayColor='rgba(73,182,77,0.9)'>
          <View style={styles.btncontainer}>
            <Text style={styles.btntext} onPress={showVariantSelection}>Add to Cart</Text>
          </View>
      </TouchableHighlight>
        </View>
        <View style={styles.infoContainer}>
          <ScrollView>
          <Text style={styles.category}>Description</Text>
            <Text style={styles.infoDescriptionProduct}>
              <HTML source={{ html: item.description }} contentWidth={contentWidth}/>
            </Text>
          </ScrollView>
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.category}>Reviews : <Text style={styles.rating}>{calculateAverageReview()}/5</Text></Text>
          
          {productReviews.map((review) => (
            <ReviewItem
              key={review.id}
              reviewerName={review.reviewerName}
              rating={review.rating}
              reviewText={review.reviewText}
            />
          ))}
        </View>
      </View>
     
    </ScrollView>
    <VariantSelectionScreen
        isVisible={isVariantSelectionVisible}
        onDone={handleVariantSelectionDone}
        onClose={onVariantSelectionClose}
        variants={itemVariants}
      />
    </View>
  );
}
