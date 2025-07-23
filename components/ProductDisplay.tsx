import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import { ProductInfo, faoResultProps } from "@/types/index";
import {
  mapEcoScores,
  mapEcoValue,
  mapNutriScore,
  isSeafood,
} from "@/utils/productHelpers";
import { mapNutriScoreIcon, mapWaterQuality } from "@/utils/componentHelpers";

const { width } = Dimensions.get("window");

interface ProductDisplayProps {
  dataProduct: ProductInfo;
  faoResult: faoResultProps | null;
  isLoadingFao: boolean;
  catchLocation: string;
  children?: React.ReactNode;
}

export default function ProductDisplay({
  dataProduct,
  faoResult,
  isLoadingFao,
  catchLocation,
  children,
}: ProductDisplayProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with gradient */}
      <LinearGradient
        colors={["#0077be", "#00a8cc", "#0096c7"]}
        style={styles.headerGradient}
      >
        <SafeAreaView style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Ionicons
              name="cube"
              size={32}
              color="white"
              style={styles.headerIcon}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>Product Analysis</Text>
              <Text style={styles.headerSubtitle}>Ocean Impact Assessment</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Product Overview Card */}
          <View style={styles.card}>
            <View style={styles.productHeader}>
              <Image
                source={{ uri: dataProduct.image_url }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>
                  {dataProduct.product_name || "Product Name Not Available"}
                </Text>
                <Text style={styles.productGeneric}>
                  {dataProduct.ecoscore_data?.agribalyse?.name_en ||
                    "No generic name available"}
                </Text>
              </View>
            </View>
          </View>

          {/* Brand Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={["#0077be", "#00a8cc"]}
                style={styles.iconContainer}
              >
                <AntDesign name="bank" size={20} color="white" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>Brand</Text>
            </View>
            <Text style={styles.sectionContent}>
              {dataProduct.brands || "Brand Not Available"}
            </Text>
          </View>

          {/* Categories Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={["#00a8cc", "#0096c7"]}
                style={styles.iconContainer}
              >
                <MaterialIcons name="food-bank" size={20} color="white" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <Text style={styles.sectionContent}>
              {dataProduct.categories || "Categories Not Available"}
            </Text>
          </View>

          {/* Ingredients Section */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={["#0096c7", "#48cae4"]}
                style={styles.iconContainer}
              >
                <MaterialCommunityIcons
                  name="food-drumstick-outline"
                  size={20}
                  color="white"
                />
              </LinearGradient>
              <Text style={styles.sectionTitle}>Ingredients</Text>
            </View>
            <Text style={styles.sectionContent}>
              {dataProduct.ingredients_text || "Ingredients not listed"}
            </Text>
          </View>

          {/* Nutri-Score Section */}
          {dataProduct.nutriscore?.["2023"]?.grade && (
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={["#48cae4", "#90e0ef"]}
                  style={styles.iconContainer}
                >
                  <SimpleLineIcons name="badge" size={20} color="white" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Nutri-Score</Text>
                <View style={styles.nutriScoreContainer}>
                  {mapNutriScoreIcon(dataProduct.nutriscore["2023"].grade)}
                  <Text style={styles.nutriScoreGrade}>
                    {dataProduct.nutriscore["2023"].grade.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.nutriScoreImageContainer}>
                <Image
                  source={mapNutriScore(dataProduct.nutriscore["2023"].grade)}
                  style={styles.nutriScoreImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}

          {/* Eco-Score Section */}
          {dataProduct.ecoscore_data && (
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={["#52b788", "#74c69d"]}
                  style={styles.iconContainer}
                >
                  <FontAwesome name="leaf" size={20} color="white" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Eco-Score</Text>
              </View>
              <View style={styles.ecoScoreContainer}>
                <View style={styles.ecoScoreItem}>
                  <Text style={styles.ecoScoreLabel}>EPI Score:</Text>
                  <Text style={styles.ecoScoreValue}>
                    {mapEcoScores(dataProduct)}
                  </Text>
                </View>
                <View style={styles.ecoScoreItem}>
                  <Text style={styles.ecoScoreLabel}>EPI Value:</Text>
                  <Text style={styles.ecoScoreValue}>
                    {mapEcoValue(dataProduct)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Seafood Section */}
          {isSeafood(dataProduct.categories_tags) && (
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={["#0077be", "#023e8a"]}
                  style={styles.iconContainer}
                >
                  <Ionicons name="fish" size={20} color="white" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Seafood Information</Text>
              </View>
              <View style={styles.seafoodContainer}>
                <View style={styles.seafoodItem}>
                  <Ionicons name="location" size={16} color="#0077be" />
                  <Text style={styles.seafoodLabel}>Catch Location:</Text>
                  <Text style={styles.seafoodValue}>
                    {catchLocation || "Not specified"}
                  </Text>
                </View>
                <View style={styles.seafoodItem}>
                  <Ionicons name="water" size={16} color="#0077be" />
                  <Text style={styles.seafoodLabel}>Water Quality:</Text>
                  <View style={styles.waterQualityContainer}>
                    {mapWaterQuality(faoResult?.pollutionEvents, isLoadingFao)}
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Render children components */}
          {children}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  // Header styles
  headerGradient: {
    paddingTop: 0,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },

  // Content styles
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },

  // Card styles
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Product overview styles
  productHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: "#f8f9fa",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
    lineHeight: 24,
  },
  productGeneric: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
  },

  // Section styles
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    flex: 1,
  },
  sectionContent: {
    fontSize: 16,
    color: "#495057",
    lineHeight: 24,
    paddingLeft: 48,
  },

  // Nutri-Score styles
  nutriScoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  nutriScoreGrade: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0077be",
    marginLeft: 8,
  },
  nutriScoreImageContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingLeft: 48,
  },
  nutriScoreImage: {
    width: 120,
    height: 80,
  },

  // Eco-Score styles
  ecoScoreContainer: {
    paddingLeft: 48,
  },
  ecoScoreItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ecoScoreLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#495057",
    minWidth: 100,
  },
  ecoScoreValue: {
    fontSize: 16,
    color: "#52b788",
    fontWeight: "600",
    marginLeft: 8,
  },

  // Seafood styles
  seafoodContainer: {
    paddingLeft: 48,
  },
  seafoodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  seafoodLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#495057",
    marginLeft: 8,
    minWidth: 120,
  },
  seafoodValue: {
    fontSize: 16,
    color: "#0077be",
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },
  waterQualityContainer: {
    marginLeft: 8,
    flex: 1,
  },

  // Spacing
  bottomSpacing: {
    height: 40,
  },
});
