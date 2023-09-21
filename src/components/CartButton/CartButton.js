import React from "react";
import { TouchableHighlight, Image, } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

import { Feather } from "@expo/vector-icons";

export default function CartButton(props) {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.btnContainer}>
      <Feather name="shopping-cart" style={styles.btnIcon}/>
    </TouchableHighlight>
  );
}

CartButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
