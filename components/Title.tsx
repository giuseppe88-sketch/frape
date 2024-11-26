import React from "react";
import { Image, StyleSheet } from "react-native";
import { Svg, Text } from "react-native-svg";

const FrapeIcon = () => (
  <Svg width="300" height="90" viewBox="0 0 300 100">
    <Text
      x="20%"
      y="50%"
      textAnchor="middle"
      fontFamily="'Poppins', sans-serif"
      fontSize="45"
      fill="#000000"
      dy=".3em"
    >
      FRAPE
    </Text>
  </Svg>
);

const styles = StyleSheet.create({
  icon: { width: 100, height: 100 }, // Adjust size as needed
});

export default FrapeIcon;
