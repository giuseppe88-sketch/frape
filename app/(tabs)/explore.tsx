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
  nutriscore: any;
  warning: string;
  labels: string;
  manufacturing_places: string;
  countries: string;
  subName: string;
  // Add any other fields you're interested in
}

export default function ProductInfoScreen() {
  const { gtin } = useLocalSearchParams(); // Retrieve gtin from route parameters
  const [dataProduct, setDataProduct] = React.useState<ProductInfo | null>(
    null
  );
  const [productOpenFoodInfo, setProductOpenFoodInfo] = React.useState<
    any | null
  >(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // // Sample static product data
  // const saveProductInfoToFile = async (data:any) => {
  //   const path = `${RNFS.DocumentDirectoryPath}/mockData.json`;
  //   await RNFS.writeFile(path, JSON.stringify(data), 'utf8');
  //   console.log(`Data saved to ${path}`);
  // };
  React.useEffect(() => {
    setLoading(true);
    const getProductInfo = async () => {
      try {
        // Make both API calls in parallel
        const [openFoodData] = await Promise.all([
          fetchProductOpenFoodInfo(gtin as string),
        ]);
        setDataProduct(openFoodData);
        // saveProductInfoToFile(openFoodData)
        alert(JSON.stringify(openFoodData));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (gtin) {
      getProductInfo();
    }
  }, [gtin]);

  if (loading) {
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

  return (
    <ScrollView style={styles.container}>
      {dataProduct ? (
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>
            {dataProduct.product_name || "Product Name Not Available"}
          </Text>
          <Text style={styles.subName}>
            {dataProduct.generic_name || "No generic name available"}
          </Text>
          <Image
            source={{ uri: dataProduct.image_url }}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <View style={styles.titleContainer}>
              <AntDesign name="bank" size={24} color="black" marginBottom={5}/>
              <Text style={styles.sectionTitle}>Brand</Text>
            </View>
            <Text style={styles.infoText}>
              {dataProduct.brands || "Brand Not Available"}
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
              {dataProduct.categories || "Categories Not Available"}
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
              {dataProduct.ingredients_text || "Ingredients not listed"}
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
              <Text style={styles.sectionTitle}>Nutritional Information</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Energy:</Text>{" "}
              {dataProduct.nutriments?.energy || "Not Available"} kcal
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Fat:</Text>{" "}
              {dataProduct.nutriments?.fat || "Not Available"} g
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Sugars:</Text>{" "}
              {dataProduct.nutriments?.sugars || "Not Available"} g
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Proteins:</Text>{" "}
              {dataProduct.nutriments?.proteins || "Not Available"} g
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
              <Text style={styles.subInfoText}>Packaging: </Text>
              {dataProduct.packaging || "Packaging Information Not Available"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Labels:</Text>{" "}
              {dataProduct.labels || "No environmental labels"}
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <Fontisto name="origin" size={24} color="black" marginTop={5} />
              <Text style={styles.sectionTitle}>Origin</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Manufacturing place: </Text>
              {dataProduct.manufacturing_places || "Not specified"}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Source:</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Catch Location:</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Fishing Method:</Text>
            </Text>

            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Countries where sold:</Text>{" "}
              {dataProduct.countries || "Not Available"}
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
          <View>
            <View style={styles.titleContainer}>
              <MaterialCommunityIcons
                name="information"
                size={24}
                color="black"
                marginTop={5}
              />
              <Text style={styles.sectionTitle}>Product Info</Text>
            </View>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Species: </Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>
                Warning: {dataProduct.warning}
              </Text>
            </Text>
          </View>
          <View>
            <View style={styles.titleContainer}>
              <MaterialIcons name="eco" size={24} color="black" marginTop={5} />
              <Text style={styles.sectionTitle}>Sustainability</Text>
            </View>

            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Environmental Impact: {""}</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Pollution Level: {""}</Text>
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.subInfoText}>Water Quality: {""}</Text>
            </Text>
          </View>

          <NutrimentsComponent data={dataProduct?.nutriments} />
        </View>
      ) : (
        <Text style={styles.noProduct}>No product data found.</Text>
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
    marginTop:10,
    marginBottom:10
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
  subName: {
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
  sectionFirstTitle:{
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
    textAlign: "center",
    marginTop: 100,
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
