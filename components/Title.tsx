import React from "react";
import { Image, StyleSheet } from "react-native";

const FrapeIcon = () => (
  <Image
    source={require("../assets/logo.png")}
    style={styles.logo}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 80,
  },
});

export default FrapeIcon;
