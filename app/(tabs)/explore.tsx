import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchProductOpenFoodInfo } from "../../api/productApi";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NutrimentsComponent from "@/components/NutrimentsComponent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import Entypo from "@expo/vector-icons/Entypo";
import FAOInput from "@/components/FAOInput";
import { Provider as PaperProvider } from "react-native-paper";

interface ProductInfo {
  title: string;
  brand: string;
  description: string;
  product_name: string;
  generic_name: string;
  brands: string;
  categories: string;
  ingredients_text: string;
  quantity: string;
  packaging: string;
  image_url: string;
  categories_tags: string;
  nutriments: {
    energy: string;
    fat: string;
    saturated_fat: string;
    sugars: string;
    salt: string;
    sodium: string;
    fiber: string;
    proteins: string;
  };
  ecoscore_data: any;
  nutriscore: any;
  agribalyse: any;
  warning: string;
  labels: string;
  manufacturing_places: string;
  countries: string;
  subName: string;
  // Add any other fields you're interested in
}

export interface faoResultProps {
  pollutionEvents: number;
}

const today = new Date();
const startDate = new Date(today);
startDate.setMonth(today.getMonth() - 3); // Subtract 3 months from today

// Format dates as ISO strings in the required format
const formattedStartDate = startDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"
const formattedEndDate = today.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"

export default function ProductInfoScreen() {
  const { gtin } = useLocalSearchParams(); // Retrieve gtin from route parameters
  const [dataProduct, setDataProduct] = React.useState<ProductInfo | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoadingFao, setIsLoadingFao] = React.useState<boolean>(false);
  const [faoResult, setFaoResult] = React.useState<faoResultProps | null>(null);
  const [catchLocation, setCatchLocation] = React.useState<string>("");

  function mapEcoScores(data: any) {
    let ecoscoreData = Object.entries(
      data.ecoscore_data.adjustments.origins_of_ingredients
    );
    const epiScoreEntry = ecoscoreData.find(
      (entry) => entry[0] === "epi_score"
    );
    if (epiScoreEntry) {
      return `${epiScoreEntry[1]}/100`;
    } else {
      return "No EPI score found.";
    }
  }
  function mapEcoValue(data: any) {
    let ecoscoreData = Object.entries(
      data.ecoscore_data.adjustments.origins_of_ingredients
    );
    const epiScoreEntry = ecoscoreData.find(
      (entry) => entry[0] === "epi_value"
    );
    if (epiScoreEntry) {
      return `${epiScoreEntry[1]}/100`;
    } else {
      return "No EPI value found.";
    }
  }

  const mapWaterQuality = React.useCallback(
    (inputResultPollution: any) => {
      if (inputResultPollution == null) return "";

      let pollutionQuality: string;

      if (inputResultPollution >= 0 && inputResultPollution <= 50) {
        pollutionQuality = "Low";
      } else if (inputResultPollution > 50 && inputResultPollution <= 200) {
        pollutionQuality = "Moderate";
      } else if (inputResultPollution > 200) {
        pollutionQuality = "High";
      } else if (isLoadingFao) {
        pollutionQuality = "Loading";
      } else {
        pollutionQuality = ""; // Fallback case
      }

      switch (pollutionQuality) {
        case "High":
          return <Text style={styles.details}>BAD</Text>;
        case "Moderate":
          return <Text style={styles.details}>MODERATE</Text>;
        case "Low":
          return <Text style={styles.details}>GOOD</Text>;
        default:
          return <Text style={styles.details}>UNKNOWN</Text>;
      }
    },
    [faoResult]
  );

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

  const mapNutriScore = (grade: string) => {
    switch (grade.toLowerCase()) {
      case "a":
        return require("../../assets/a-nutri-score.png");
      case "b":
        return require("../../assets/a-nutri-score.png");
      case "c":
        return require("../../assets/a-nutri-score.png");
      case "d":
        return require("../../assets/a-nutri-score.png");
      case "e":
        return require("../../assets/a-nutri-score.png");
      default:
        return null; // or a default placeholder image
    }
  };

  const BASE_URL =
    "https://6af9-2a00-20-604e-2f8a-e9e1-b03f-95c5-22b6.ngrok-free.app/";
  // const BASE_URL = "http://172.20.10.2:5000/";
  const fetchData = async (faoDetails: any) => {
    setIsLoadingFao(true);
    setCatchLocation(faoDetails.location);
    try {
      const response = await fetch(`${BASE_URL}fetch-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          minDepth: 0.493,
          maxDepth: 5727.918,
          minLat: faoDetails.latRange.min,
          maxLat: faoDetails.latRange.max,
          minLon: faoDetails.lonRange.min,
          maxLon: faoDetails.lonRange.max,
          startDatetime: formattedStartDate, // Use dynamically calculated start date
          endDatetime: formattedEndDate, // Use today's date for end date
          output_filename: faoDetails.nameDataFile,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      setIsLoadingFao(false);
      setFaoResult(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFaoSelect = (selectedFao: any) => {
    fetchData(selectedFao)
      .then((data) => {
        if (data) {
          console.log("Pollution Events:", data.pollutionEvents);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  };

  const mapNutriScoreIcon = (grade: string) => {
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
        return (
          <Entypo name="emoji-sad" size={24} color="black" marginTop={5} />
        );
      case "e":
        return (
          <Entypo name="emoji-sad" size={24} color="black" marginTop={5} />
        );
      default:
        return null; // or a default placeholder image
    }
  };
  // if (error) {
  //   return <Text style={styles.errorText}>Error: {error}</Text>;
  // }

  const isSeafood = (categories: any) => {
    if (categories && categories.includes("en:seafood")) {
      return true;
    } else return false;
  };

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
              <Text style={styles.subInfoText}>Packaging:</Text>
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
              <Text style={styles.subInfoText}>Environmental Score:{""}</Text>
              <Text style={styles.details}>{mapEcoScores(dataProduct)}</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Environmental Value:{""}</Text>
              <Text style={styles.details}>{mapEcoValue(dataProduct)}</Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <Fontisto name="origin" size={24} color="black" marginTop={5} />
              <Text style={styles.sectionTitle}>Origin</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Manufacturing place:</Text>
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
                <Text style={styles.subInfoText}>
                  Catch Location:
                  <Text style={styles.details}>{catchLocation}</Text>
                </Text>
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.subInfoText}>Fishing Method:</Text>
              </Text>{" "}
              <Text style={styles.infoText}>
                <Text style={styles.subInfoText}>
                  Pollution Level:{""}{" "}
                  {isLoadingFao ? (
                    <ActivityIndicator
                      size="small"
                      color={"green"}
                      style={styles.loadingIndicatorFao}
                    />
                  ) : (
                    <Text style={styles.details}>
                      {" "}
                      {faoResult?.pollutionEvents}
                    </Text>
                  )}
                </Text>
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.subInfoText}>
                  Water Quality:
                  {isLoadingFao ? (
                    <ActivityIndicator
                      size="small"
                      color={"green"}
                      style={styles.loadingIndicatorFao}
                    />
                  ) : (
                    mapWaterQuality(faoResult?.pollutionEvents)
                  )}
                  {""}
                </Text>
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
