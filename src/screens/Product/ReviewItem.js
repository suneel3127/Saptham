import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const ReviewItem = ({ reviewerName, rating, reviewText }) => {
  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewerName}>{reviewerName}</Text>
      <Text style={styles.rating}>Rating: {rating}/5</Text>
      <Text style={styles.reviewText}>{reviewText}</Text>
    </View>
  );
};



export default ReviewItem;
