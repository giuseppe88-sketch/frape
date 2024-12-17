import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface NutritionDataProps {
  calcium?: number;
  calcium_100g?: number;
  calcium_serving?: number;
  calcium_unit?: string;
  calcium_value?: number;
  carbohydrates?: number;
  carbohydrates_100g?: number;
  carbohydrates_serving?: number;
  carbohydrates_unit?: string;
  carbohydrates_value?: number;
  cholesterol?: number;
  cholesterol_100g?: number;
  cholesterol_serving?: number;
  cholesterol_unit?: string;
  cholesterol_value?: number;
  energy?: number;
  "energy-kcal"?: number;
  "energy-kcal_100g"?: number;
  "energy-kcal_serving"?: number;
  "energy-kcal_unit"?: string;
  "energy-kcal_value"?: number;
  "energy-kcal_value_computed"?: number;
  energy_100g?: number;
  energy_serving?: number;
  energy_unit?: string;
  energy_value?: number;
  fat?: number;
  fat_100g?: number;
  fat_serving?: number;
  fat_unit?: string;
  fat_value?: number;
  fiber?: number;
  fiber_100g?: number;
  fiber_serving?: number;
  fiber_unit?: string;
  fiber_value?: number;
  "fruits-vegetables-legumes-estimate-from-ingredients_100g"?: number;
  "fruits-vegetables-legumes-estimate-from-ingredients_serving"?: number;
  "fruits-vegetables-nuts-estimate-from-ingredients_100g"?: number;
  "fruits-vegetables-nuts-estimate-from-ingredients_serving"?: number;
  iron?: number;
  iron_100g?: number;
  iron_serving?: number;
  iron_unit?: string;
  iron_value?: number;
  "nova-group"?: number;
  "nova-group_100g"?: number;
  "nova-group_serving"?: number;
  "nutrition-score-fr"?: number;
  "nutrition-score-fr_100g"?: number;
  proteins?: number;
  proteins_100g?: number;
  proteins_serving?: number;
  proteins_unit?: string;
  proteins_value?: number;
  salt?: number;
  salt_100g?: number;
  salt_serving?: number;
  salt_unit?: string;
  salt_value?: number;
  "saturated-fat"?: number;
  "saturated-fat_100g"?: number;
  "saturated-fat_serving"?: number;
  "saturated-fat_unit"?: string;
  "saturated-fat_value"?: number;
  sodium?: number;
  sodium_100g?: number;
  sodium_serving?: number;
  sodium_unit?: string;
  sodium_value?: number;
  sugars?: number;
  sugars_100g?: number;
  sugars_serving?: number;
  sugars_unit?: string;
  sugars_value?: number;
  "trans-fat"?: number;
  "trans-fat_100g"?: number;
  "trans-fat_serving"?: number;
  "trans-fat_unit"?: string;
  "trans-fat_value"?: number;
  "vitamin-a"?: number;
  "vitamin-a_100g"?: number;
  "vitamin-a_serving"?: number;
  "vitamin-a_unit"?: string;
  "vitamin-a_value"?: number;
  "vitamin-c"?: number;
  "vitamin-c_100g"?: number;
  "vitamin-c_serving"?: number;
  "vitamin-c_unit"?: string;
  "vitamin-c_value"?: number;
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
            {data.calcium || "0"} {""} {data.calcium_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Carbohydrates:</Text> {""}
          <Text style={styles.details}>
            {data.carbohydrates || "0"}
            {data.carbohydrates_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Cholesterol:</Text> {""}
          {""}
          <Text style={styles.details}>
            {data.cholesterol || "0"}
            {data.cholesterol}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Energy-kcal:</Text> {""}
          <Text style={styles.details}>
            {data["energy-kcal"] || "Energy Not Available"}
            {data["energy-kcal_unit"]}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Fat:</Text> {""}
          <Text style={styles.details}>
            {data.fat || "0"}
            {data.fat_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Fiber:</Text> {""}
          <Text style={styles.details}>
            {data.fiber || "0"}
            {data.fiber_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Iron:</Text> {""}
          <Text style={styles.details}>
            {data.iron || "0"}
            {data.iron_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Proteins:</Text> {""}
          <Text style={styles.details}>
            {data.proteins || "0"}
            {data.proteins_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Salt:</Text> {""}
          <Text style={styles.details}>
            {data.salt || "0"}
            {data.salt_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Satured Fat:</Text>{" "}
          <Text style={styles.details}>
            {data["saturated-fat"] || "no satured fat"}
            {data["saturated-fat_unit"]}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Sodium:</Text>{" "}
          <Text style={styles.details}>
            {data.sodium || "no sodium"}
            {data.sodium_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Sugars:</Text>{" "}
          <Text style={styles.details}>
            {data.sugars || "0"}
            {data.sugars_unit}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Trans Fat:</Text>{" "}
          <Text style={styles.details}>
            {data["trans-fat"] || "no trans fat"}
            {data["trans-fat_unit"]}
          </Text>
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.subInfoText}>Vitamin A:</Text>{" "}
          <Text style={styles.details}>
            {data["vitamin-a"] || "vitamin a Not Available"}{" "}
            {data["vitamin-a_unit"]}{" "}
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
