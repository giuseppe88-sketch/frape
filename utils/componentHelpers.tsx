import React from "react";
import { Text, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { getWaterQualityLevel } from "./productHelpers";

/**
 * React component utilities for product display
 */

/**
 * Maps nutri-score grade to corresponding icon component
 */
export function mapNutriScoreIcon(grade: string) {
  switch (grade.toLowerCase()) {
    case "a":
      return (
        <Entypo name="emoji-happy" size={24} color="black" marginTop={5} />
      );
    case "b":
      return (
        <Entypo name="emoji-happy" size={24} color="black" marginTop={5} />
      );
    case "c":
      return (
        <Entypo name="emoji-neutral" size={24} color="black" marginTop={5} />
      );
    case "d":
      return <Entypo name="emoji-sad" size={24} color="black" marginTop={5} />;
    case "e":
      return <Entypo name="emoji-sad" size={24} color="black" marginTop={5} />;
    default:
      return null; // or a default placeholder image
  }
}

/**
 * Maps water quality level to styled text component
 */
export function mapWaterQuality(
  inputResultPollution: any,
  isLoading: boolean = false
) {
  const qualityLevel = getWaterQualityLevel(inputResultPollution);

  if (isLoading) {
    return <Text style={styles.details}>LOADING</Text>;
  }

  switch (qualityLevel) {
    case "High":
      return <Text style={styles.details}>BAD</Text>;
    case "Moderate":
      return <Text style={styles.details}>MODERATE</Text>;
    case "Low":
      return <Text style={styles.details}>GOOD</Text>;
    default:
      return <Text style={styles.details}>UNKNOWN</Text>;
  }
}

const styles = StyleSheet.create({
  details: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
});
