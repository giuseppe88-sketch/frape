import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
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
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>
          {dataProduct.product_name || "Product Name Not Available"}
        </Text>
        <Text style={styles.details}>
          {dataProduct.ecoscore_data?.agribalyse?.name_en ||
            "No generic name available"}
        </Text>
        <Image
          source={{ uri: dataProduct.image_url }}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Brand Section */}
        <View>
          <View style={styles.titleContainer}>
            <AntDesign name="bank" size={24} color="black" />
            <Text style={styles.sectionTitle}>Brand</Text>
          </View>
          <Text style={styles.infoText}>
            <Text style={styles.details}>
              {dataProduct.brands || "Brand Not Available"}
            </Text>
          </Text>
        </View>

        {/* Categories Section */}
        <View>
          <View style={styles.titleContainer}>
            <MaterialIcons name="food-bank" size={24} color="black" />
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <Text style={styles.infoText}>
            <Text style={styles.details}>
              {dataProduct.categories || "Categories Not Available"}
            </Text>
          </Text>
        </View>

        {/* Ingredients Section */}
        <View>
          <View style={styles.titleContainer}>
            <MaterialCommunityIcons
              name="food-drumstick-outline"
              size={24}
              color="black"
            />
            <Text style={styles.sectionTitle}>Ingredients</Text>
          </View>
          <Text style={styles.infoText}>
            <Text style={styles.details}>
              {dataProduct.ingredients_text || "Ingredients not listed"}
            </Text>
          </Text>
        </View>

        {/* Nutri-Score Section */}
        {dataProduct.nutriscore?.["2023"]?.grade && (
          <View>
            <View style={styles.titleContainer}>
              <SimpleLineIcons name="badge" size={24} color="black" />
              <Text style={styles.sectionTitle}>Nutri-Score</Text>
              {mapNutriScoreIcon(dataProduct.nutriscore["2023"].grade)}
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.details}>
                {dataProduct.nutriscore["2023"].grade.toUpperCase()}
              </Text>
            </Text>
            <Image
              source={mapNutriScore(dataProduct.nutriscore["2023"].grade)}
              style={styles.imageNutriScore}
              resizeMode="contain"
            />
          </View>
        )}

        {/* Eco-Score Section */}
        {dataProduct.ecoscore_data && (
          <View>
            <View style={styles.titleContainer}>
              <FontAwesome name="leaf" size={24} color="black" />
              <Text style={styles.sectionTitle}>Eco-Score</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>EPI Score:</Text>{" "}
              <Text style={styles.details}>{mapEcoScores(dataProduct)}</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>EPI Value:</Text>{" "}
              <Text style={styles.details}>{mapEcoValue(dataProduct)}</Text>
            </Text>
          </View>
        )}

        {/* Seafood Section */}
        {isSeafood(dataProduct.categories_tags) && (
          <View>
            <View style={styles.titleContainer}>
              <Fontisto name="info" size={24} color="black" />
              <Text style={styles.sectionTitle}>Seafood Information</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Catch Location:</Text>{" "}
              <Text style={styles.details}>
                {catchLocation || "Not specified"}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Water Quality:</Text>{" "}
              {mapWaterQuality(faoResult?.pollutionEvents, isLoadingFao)}
            </Text>
          </View>
        )}

        {/* Render children components */}
        {children}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  infoContainer: {
    padding: 20,
    marginVertical: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 45,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
  },
  imageNutriScore: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 15,
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
  infoText: {
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 5,
  },
  subInfoText: {
    fontWeight: "bold",
  },
  details: {
    fontSize: 18,
    color: "#666",
  },
  infoTextOptions: {
    margin: 5,
    fontSize: 9,
  },
  loadingIndicatorFao: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 20,
  },
});
