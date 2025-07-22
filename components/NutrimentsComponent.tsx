import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NutritionDataProps } from "@/types/index";

const NutrimentsComponent: React.FC<NutritionDataProps> = React.memo(
  ({ data }: NutritionDataProps) => {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons
            name="food-variant"
            size={24}
            color="black"
            marginTop={5}
          />
          <View style={styles.inlineContainer}>
            {" "}
            <Text style={styles.sectionTitle}>Nutriments in Detail</Text>
            <Text style={{ marginTop: 5 }}>{""}(per 100gr)</Text>
          </View>
          {/* <Text style={styles.sectionTitle}>Nutriments in Detail</Text> */}
        </View>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Calcium:</Text>{" "}
          <Text style={styles.details}>
            {data?.calcium || "0"} {""} {data?.calcium_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Carbohydrates:</Text> {""}
          <Text style={styles.details}>
            {data?.carbohydrates || "0"}
            {data?.carbohydrates_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Cholesterol:</Text> {""}
          {""}
          <Text style={styles.details}>
            {data?.cholesterol || "0"}
            {data?.cholesterol}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Energy-kcal:</Text> {""}
          <Text style={styles.details}>
            {data
              ? data["energy-kcal"] || "Energy Not Available"
              : "Data not available"}
            {data ? data["energy-kcal_unit"] : " Data not available"}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Fat:</Text> {""}
          <Text style={styles.details}>
            {data?.fat || "0"}
            {data?.fat_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Fiber:</Text> {""}
          <Text style={styles.details}>
            {data?.fiber || "0"}
            {data?.fiber_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Iron:</Text> {""}
          <Text style={styles.details}>
            {data?.iron || "0"}
            {data?.iron_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Proteins:</Text> {""}
          <Text style={styles.details}>
            {data?.proteins || "0"}
            {data?.proteins_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Salt:</Text> {""}
          <Text style={styles.details}>
            {data?.salt || "0"}
            {data?.salt_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Satured Fat:</Text>{" "}
          <Text style={styles.details}>
            {data
              ? data["saturated-fat"] || "no satured fat"
              : "Data not available"}
            {data ? data["saturated-fat_unit"] : " Data not available"}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Sodium:</Text>{" "}
          <Text style={styles.details}>
            {data?.sodium || "no sodium"}
            {data?.sodium_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Sugars:</Text>{" "}
          <Text style={styles.details}>
            {data?.sugars || "0"}
            {data?.sugars_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Trans Fat:</Text>{" "}
          <Text style={styles.details}>
            {data ? data["trans-fat"] || "no trans fat" : " Data not available"}
            {data ? data["trans-fat_unit"] : " Data not available"}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Vitamin A:</Text>{" "}
          <Text style={styles.details}>
            {data
              ? data["vitamin-a"] || "vitamin a Not Available"
              : "Data not available"}{" "}
            {data ? data["vitamin-a_unit"] : "Data not available"}{" "}
          </Text>
        </Text>
      </View>
    );
  }
);
export default NutrimentsComponent;

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 15,
  },
  subInfoText: {
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inlineContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    fontSize: 18,
    color: "#666",
  },
});
