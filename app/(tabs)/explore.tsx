import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useLocalSearchParams } from "expo-router";
import { fetchProductOpenFoodInfo } from "../../api/productApi";
import { fetchFaoPollutionData } from "../../api/faoApi";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NutrimentsComponent, {
  NutritionDataProps,
} from "@/components/NutrimentsComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import FAOInput from "@/components/FAOInput";
import { Provider as PaperProvider } from "react-native-paper";
import { ProductInfo, faoResultProps, FaoDetails } from "@/types/index";
import {
  mapEcoScores,
  mapEcoValue,
  mapNutriScore,
  isSeafood,
} from "@/utils/productHelpers";
import { mapNutriScoreIcon, mapWaterQuality } from "@/utils/componentHelpers";

const today = new Date();
const startDate = new Date(today);
startDate.setMonth(today.getMonth() - 3); // Subtract 3 months from today

// Format dates as ISO strings in the required format
const formattedStartDate = startDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"
const formattedEndDate = today.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"

export default function ProductInfoScreen() {
  const navigation = useNavigation();

  const { gtin } = useLocalSearchParams(); // Retrieve gtin from route parameters
  const [dataProduct, setDataProduct] = React.useState<ProductInfo | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoadingFao, setIsLoadingFao] = React.useState<boolean>(false);
  const [faoResult, setFaoResult] = React.useState<faoResultProps | null>(null);
  const [catchLocation, setCatchLocation] = React.useState<string>("");

  const handleFaoSelect = async (selectedFao: any) => {
    setIsLoadingFao(true);
    setCatchLocation(selectedFao.location);
    try {
      const response = await fetchFaoPollutionData(selectedFao.area);
    

      const data = await response;
      console.log("Response:", data);
      setIsLoadingFao(false);
      setFaoResult(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    const getProductInfo = async () => {
      setLoading(true);
      try {
        // Make both API calls in parallel
        const [openFoodData] = await Promise.all([
          fetchProductOpenFoodInfo(gtin as string),
        ]);
        setDataProduct(openFoodData);
        // saveDataToLocalFile(openFoodData)
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (gtin !== undefined) {
      getProductInfo();
    }
  }, [gtin]);

  if (loading === true) {
    return (
      <ActivityIndicator
        size="large"
        color={"green"}
        style={styles.loadingIndicator}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      {dataProduct ? (
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>
            {dataProduct.product_name || "Product Name Not Available"}
          </Text>
          <Text style={styles.details}>
            {dataProduct.ecoscore_data.agribalyse.name_en ||
              "No generic name available"}
          </Text>
          <Image
            source={{ uri: dataProduct.image_url }}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <View style={styles.titleContainer}>
              <AntDesign name="bank" size={24} color="black" marginBottom={5} />
              <Text style={styles.sectionTitle}>Brand</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.details}>
                {dataProduct.brands || "Brand Not Available"}
              </Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <MaterialIcons
                name="food-bank"
                size={24}
                color="black"
                marginTop={5}
              />
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.details}>
                {" "}
                {dataProduct.categories || "Categories Not Available"}
              </Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons
                name="food-drumstick-outline"
                size={24}
                color="black"
                marginTop={5}
              />
              <Text style={styles.sectionTitle}>Ingredients</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.details}>
                {dataProduct.ingredients_text || "Ingredients not listed"}
              </Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <AntDesign
                name="infocirlceo"
                size={24}
                color="black"
                marginTop={5}
              />
              <View style={styles.inlineContainer}>
                {" "}
                <Text style={styles.sectionTitle}>Nutritional Information</Text>
                <Text style={{ marginTop: 5 }}>(per 100gr)</Text>
              </View>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Energy:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.nutriments?.energy || "Not Available"} kcal
              </Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Fat:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.nutriments?.fat || "Not Available"} g
              </Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Sugars:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.nutriments?.sugars || "Not Available"} g
              </Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Proteins:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.nutriments?.proteins || "Not Available"} g
              </Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <FontAwesome
                name="envira"
                size={24}
                color="black"
                marginTop={5}
              />
              <Text style={styles.sectionTitle}>Environmental Information</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Packaging:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.packaging || "Packaging Information Not Available"}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Labels:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.labels || "No environmental labels"}
              </Text>
            </Text>{" "}
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Environmental Score:</Text>{" "}
              <Text style={styles.details}>{mapEcoScores(dataProduct)}</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Environmental Value:</Text>{" "}
              <Text style={styles.details}>{mapEcoValue(dataProduct)}</Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <Fontisto name="origin" size={24} color="black" marginTop={5} />
              <Text style={styles.sectionTitle}>Origin</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Manufacturing place:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.manufacturing_places || "Not specified"}
              </Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Countries where sold:</Text>{" "}
              <Text style={styles.details}>
                {dataProduct.countries || "Not Available"}
              </Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              {mapNutriScoreIcon(dataProduct.nutriscore["2023"].grade)}
              <Text style={styles.sectionTitle}>Nutriscore</Text>
              <Image
                source={mapNutriScore(dataProduct.nutriscore["2023"].grade)}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
          {isSeafood(dataProduct.categories_tags) && (
            <View>
              <Text style={styles.infoTextOptions}>
                Below, you can select an FAO area to check the pollution levels
                and water quality for that specific region. While brands and
                companies are not legally required to indicate the FAO area
                where the fish was caught, some may include this information on
                the packaging, often near the label or on the top of cans.
                Please look for the FAO area mentioned on the product, then
                choose the corresponding option from the list. We will provide
                you with the latest available water pollution data for that
                region directly from copernicus satellite.
              </Text>
              <View style={styles.titleContainer}>
                <MaterialCommunityIcons
                  name="information"
                  size={24}
                  color="black"
                  marginTop={5}
                />
                <Text style={styles.sectionTitle}>
                  Product Info & Pollution
                </Text>
              </View>
              <Text style={styles.infoText}>
                <Text style={styles.subInfoText}>Catch Location:</Text>{" "}
                <Text style={styles.details}>{catchLocation}</Text>
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.subInfoText}>Fishing Method:</Text>
              </Text>{" "}
              <Text style={styles.infoText}>
                <Text style={styles.subInfoText}>
                  Pollution Events{" "}
                  <Text style={{ fontSize: 8 }}>(exceeding 10 mg/m³)</Text>:
                </Text>{" "}
                <Text style={styles.details}>
                  {isLoadingFao ? (
                    <ActivityIndicator
                      size="small"
                      color={"green"}
                      style={styles.loadingIndicatorFao}
                    />
                  ) : (
                    <Text style={styles.details}>
                      {faoResult?.pollutionEvents}
                    </Text>
                  )}
                </Text>
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.subInfoText}>Water Quality:</Text>{" "}
                {isLoadingFao ? (
                  <ActivityIndicator
                    size="small"
                    color={"green"}
                    style={styles.loadingIndicatorFao}
                  />
                ) : (
                  mapWaterQuality(faoResult?.pollutionEvents)
                )}
              </Text>
              <PaperProvider>
                <FAOInput onFaoSelect={handleFaoSelect} />
              </PaperProvider>
            </View>
          )}
          <NutrimentsComponent data={dataProduct?.nutriments} />
        </View>
      ) : (
        <Text style={styles.noProduct}>
          Scan the barcode on the product first.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  loadingIndicator: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
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
  details: {
    fontSize: 18,
    color: "#666",
  },
  rating: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4a90e2",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 15,
  },
  sectionFirstTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 15,
  },
  infoText: {
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 5,
  },
  subInfoText: {
    fontWeight: "bold",
  },
  noProduct: {
    margin: 20,
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
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
  loadingIndicatorFao: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 20,
  },
  infoTextOptions: {
    margin: 5,
    fontSize: 9,
  },
});
