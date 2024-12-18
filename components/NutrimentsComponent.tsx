import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export interface NutritionDataProps {
  data: {
    calcium?: number | null;
    calcium_100g?: number | null;
    calcium_serving?: number | null;
    calcium_unit?: string | null;
    calcium_value?: number | null;
    carbohydrates?: number | null;
    carbohydrates_100g?: number | null;
    carbohydrates_serving?: number | null;
    carbohydrates_unit?: string | null;
    carbohydrates_value?: number | null;
    cholesterol?: number | null;
    cholesterol_100g?: number | null;
    cholesterol_serving?: number | null;
    cholesterol_unit?: string | null;
    cholesterol_value?: number | null;
    energy?: number | null;
    "energy-kcal"?: number | null;
    "energy-kcal_100g"?: number | null;
    "energy-kcal_serving"?: number | null;
    "energy-kcal_unit"?: string | null;
    "energy-kcal_value"?: number | null;
    "energy-kcal_value_computed"?: number | null;
    energy_100g?: number | null;
    energy_serving?: number | null;
    energy_unit?: string | null;
    energy_value?: number | null;
    fat?: number | null;
    fat_100g?: number | null;
    fat_serving?: number | null;
    fat_unit?: string | null;
    fat_value?: number | null;
    fiber?: number | null;
    fiber_100g?: number | null;
    fiber_serving?: number | null;
    fiber_unit?: string | null;
    fiber_value?: number | null;
    "fruits-vegetables-legumes-estimate-from-ingredients_100g"?: number | null;
    "fruits-vegetables-legumes-estimate-from-ingredients_serving"?:
      | number
      | null;
    "fruits-vegetables-nuts-estimate-from-ingredients_100g"?: number | null;
    "fruits-vegetables-nuts-estimate-from-ingredients_serving"?: number | null;
    iron?: number | null;
    iron_100g?: number | null;
    iron_serving?: number | null;
    iron_unit?: string | null;
    iron_value?: number | null;
    "nova-group"?: number | null;
    "nova-group_100g"?: number | null;
    "nova-group_serving"?: number | null;
    "nutrition-score-fr"?: number | null;
    "nutrition-score-fr_100g"?: number | null;
    proteins?: number | null;
    proteins_100g?: number | null;
    proteins_serving?: number | null;
    proteins_unit?: string | null;
    proteins_value?: number | null;
    salt?: number | null;
    salt_100g?: number | null;
    salt_serving?: number | null;
    salt_unit?: string | null;
    salt_value?: number | null;
    "saturated-fat"?: number | null;
    "saturated-fat_100g"?: number | null;
    "saturated-fat_serving"?: number | null;
    "saturated-fat_unit"?: string | null;
    "saturated-fat_value"?: number | null;
    sodium?: number | null;
    sodium_100g?: number | null;
    sodium_serving?: number | null;
    sodium_unit?: string | null;
    sodium_value?: number | null;
    sugars?: number | null;
    sugars_100g?: number | null;
    sugars_serving?: number | null;
    sugars_unit?: string | null;
    sugars_value?: number | null;
    "trans-fat"?: number | null;
    "trans-fat_100g"?: number | null;
    "trans-fat_serving"?: number | null;
    "trans-fat_unit"?: string | null;
    "trans-fat_value"?: number | null;
    "vitamin-a"?: number | null;
    "vitamin-a_100g"?: number | null;
    "vitamin-a_serving"?: number | null;
    "vitamin-a_unit"?: string | null;
    "vitamin-a_value"?: number | null;
    "vitamin-c"?: number | null;
    "vitamin-c_100g"?: number | null;
    "vitamin-c_serving"?: number | null;
    "vitamin-c_unit"?: string | null;
    "vitamin-c_value"?: number | null;
  } | null;
}

// import data.nutriments from "../assets/data.nutriments.json";
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
