import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NutritionDataProps } from "@/types/index";

interface NutrientItemProps {
  label: string;
  value: string | number | null | undefined;
  unit?: string | null | undefined;
  icon: string;
  color: string;
}

const NutrientItem: React.FC<NutrientItemProps> = ({
  label,
  value,
  unit,
  icon,
  color,
}) => (
  <View style={styles.nutrientItem}>
    <View style={styles.nutrientIcon}>
      <Ionicons name={icon as any} size={16} color={color} />
    </View>
    <View style={styles.nutrientContent}>
      <Text style={styles.nutrientLabel}>{label}</Text>
      <Text style={styles.nutrientValue}>
        {value || "0"} {unit || ""}
      </Text>
    </View>
  </View>
);

const NutrimentsComponent: React.FC<NutritionDataProps> = React.memo(
  ({ data }: NutritionDataProps) => {
    const nutrients = [
      {
        label: "Energy",
        value: data?.["energy-kcal"] || "Not Available",
        unit: data?.["energy-kcal_unit"] || "kcal",
        icon: "flash",
        color: "#ff6b35",
      },
      {
        label: "Proteins",
        value: data?.proteins,
        unit: data?.proteins_unit,
        icon: "fitness",
        color: "#e63946",
      },
      {
        label: "Carbohydrates",
        value: data?.carbohydrates,
        unit: data?.carbohydrates_unit,
        icon: "leaf",
        color: "#f77f00",
      },
      {
        label: "Fat",
        value: data?.fat,
        unit: data?.fat_unit,
        icon: "water",
        color: "#fcbf49",
      },
      {
        label: "Saturated Fat",
        value: data?.["saturated-fat"] || "Not Available",
        unit: data?.["saturated-fat_unit"],
        icon: "warning",
        color: "#f9844a",
      },
      {
        label: "Trans Fat",
        value: data?.["trans-fat"] || "Not Available",
        unit: data?.["trans-fat_unit"],
        icon: "close-circle",
        color: "#ee6c4d",
      },
      {
        label: "Fiber",
        value: data?.fiber,
        unit: data?.fiber_unit,
        icon: "leaf-outline",
        color: "#90e0ef",
      },
      {
        label: "Sugars",
        value: data?.sugars,
        unit: data?.sugars_unit,
        icon: "diamond",
        color: "#0096c7",
      },
      {
        label: "Salt",
        value: data?.salt,
        unit: data?.salt_unit,
        icon: "cube",
        color: "#0077be",
      },
      {
        label: "Sodium",
        value: data?.sodium || "Not Available",
        unit: data?.sodium_unit,
        icon: "ellipse",
        color: "#023e8a",
      },
      {
        label: "Calcium",
        value: data?.calcium,
        unit: data?.calcium_unit,
        icon: "medical",
        color: "#52b788",
      },
      {
        label: "Iron",
        value: data?.iron,
        unit: data?.iron_unit,
        icon: "magnet",
        color: "#74c69d",
      },
      {
        label: "Vitamin A",
        value: data?.["vitamin-a"] || "Not Available",
        unit: data?.["vitamin-a_unit"],
        icon: "sunny",
        color: "#95d5b2",
      },
      {
        label: "Cholesterol",
        value: data?.cholesterol,
        unit: data?.cholesterol_unit,
        icon: "heart",
        color: "#d8f3dc",
      },
    ];

    return (
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <LinearGradient
            colors={["#52b788", "#74c69d"]}
            style={styles.headerIconContainer}
          >
            <MaterialCommunityIcons
              name="food-variant"
              size={20}
              color="white"
            />
          </LinearGradient>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Nutritional Information</Text>
            <Text style={styles.headerSubtitle}>
              Detailed nutrient breakdown per 100g
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="information-circle" size={16} color="#52b788" />
            <Text style={styles.infoText}>
              Values are calculated per 100 grams of product
            </Text>
          </View>
        </View>

        {/* Nutrients Grid */}
        <View style={styles.nutrientsContainer}>
          {nutrients.map((nutrient, index) => (
            <NutrientItem
              key={index}
              label={nutrient.label}
              value={nutrient.value}
              unit={nutrient.unit}
              icon={nutrient.icon}
              color={nutrient.color}
            />
          ))}
        </View>

        {/* Footer Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            💡 Nutritional values may vary based on preparation methods and
            serving sizes
          </Text>
        </View>
      </View>
    );
  }
);

export default NutrimentsComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Header styles
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 18,
  },

  // Info section styles
  infoSection: {
    backgroundColor: "rgba(82, 183, 136, 0.05)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#52b788",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },

  // Nutrients styles
  nutrientsContainer: {
    marginBottom: 20,
  },
  nutrientItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  nutrientIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  nutrientContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nutrientLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#212529",
    flex: 1,
  },
  nutrientValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#495057",
    textAlign: "right",
    minWidth: 80,
  },

  // Footer styles
  footerInfo: {
    backgroundColor: "rgba(82, 183, 136, 0.05)",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#52b788",
  },
  footerText: {
    fontSize: 13,
    color: "#495057",
    lineHeight: 18,
    fontStyle: "italic",
  },
});
