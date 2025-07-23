import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Animated,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { fetchProductOpenFoodInfo } from "../../api/productApi";
import { fetchFaoPollutionData } from "../../api/faoApi";
import { ProductInfo, faoResultProps, FaoDetails } from "@/types/index";
import ProductDisplay from "@/components/ProductDisplay";
import FAOInput from "@/components/FAOInput";
import NutrimentsComponent from "@/components/NutrimentsComponent";
import { Provider as PaperProvider } from "react-native-paper";
import { isSeafood } from "@/utils/productHelpers";

const today = new Date();
const startDate = new Date(today);
startDate.setMonth(today.getMonth() - 3); // Subtract 3 months from today

export default function ProductInfoScreen() {
  const { gtin } = useLocalSearchParams(); // Retrieve gtin from route parameters
  const [dataProduct, setDataProduct] = React.useState<ProductInfo | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoadingFao, setIsLoadingFao] = React.useState<boolean>(false);
  const [faoResult, setFaoResult] = React.useState<faoResultProps | null>(null);
  const [catchLocation, setCatchLocation] = React.useState<string>("");
  const [loadingAnimation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    // Start loading animation
    const animateLoading = () => {
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animateLoading());
    };

    if (loading) {
      animateLoading();
    }
  }, [loading]);

  const handleFaoSelect = async (selectedFao: any) => {
    setIsLoadingFao(true);
    setCatchLocation(selectedFao.location);
    console.log("selectedFao Explore: ", selectedFao);
    try {
      const response = await fetchFaoPollutionData(selectedFao.area);
      const data = await response;
      setIsLoadingFao(false);
      setFaoResult(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setIsLoadingFao(false);
    }
  };

  React.useEffect(() => {
    const getProductInfo = async () => {
      setLoading(true);
      try {
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
      <LinearGradient
        colors={["#0077be", "#00a8cc", "#0096c7"]}
        style={styles.loadingContainer}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.loadingContent}>
          <View style={styles.loadingIconContainer}>
            <Animated.View
              style={[
                styles.loadingIconWrapper,
                {
                  transform: [
                    {
                      scale: loadingAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.2],
                      }),
                    },
                  ],
                  opacity: loadingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                  }),
                },
              ]}
            >
              <Ionicons name="search" size={60} color="white" />
            </Animated.View>
          </View>

          <Text style={styles.loadingTitle}>Analyzing Product</Text>
          <Text style={styles.loadingSubtitle}>
            Fetching product information and environmental data...
          </Text>

          <View style={styles.loadingIndicatorContainer}>
            <ActivityIndicator
              size="large"
              color="white"
              style={styles.loadingIndicator}
            />
          </View>

          <View style={styles.loadingSteps}>
            <View style={styles.loadingStep}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="rgba(255,255,255,0.8)"
              />
              <Text style={styles.loadingStepText}>
                Scanning barcode: {gtin}
              </Text>
            </View>
            <View style={styles.loadingStep}>
              <ActivityIndicator size="small" color="white" />
              <Text style={styles.loadingStepText}>
                Retrieving product data
              </Text>
            </View>
            <View style={styles.loadingStep}>
              <Ionicons
                name="ellipse-outline"
                size={20}
                color="rgba(255,255,255,0.5)"
              />
              <Text style={[styles.loadingStepText, { opacity: 0.5 }]}>
                Analyzing environmental impact
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={["#d62828", "#f77f00", "#fcbf49"]}
        style={styles.errorContainer}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.errorContent}>
          <Ionicons name="alert-circle" size={80} color="white" />
          <Text style={styles.errorTitle}>Product Not Found</Text>
          <Text style={styles.errorSubtitle}>
            We couldn't find information for this product.
          </Text>
          <Text style={styles.errorDetails}>GTIN: {gtin}</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!dataProduct) {
    return (
      <LinearGradient
        colors={["#6c757d", "#adb5bd", "#dee2e6"]}
        style={styles.emptyContainer}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.emptyContent}>
          <Ionicons name="cube-outline" size={80} color="white" />
          <Text style={styles.emptyTitle}>No Product Data</Text>
          <Text style={styles.emptySubtitle}>
            Please scan a valid product barcode to continue.
          </Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProductDisplay
        dataProduct={dataProduct}
        faoResult={faoResult}
        isLoadingFao={isLoadingFao}
        catchLocation={catchLocation}
      >
        {/* FAO Input for seafood products */}
        {isSeafood(dataProduct.categories_tags) && (
          <PaperProvider>
            <FAOInput onFaoSelect={handleFaoSelect} />
          </PaperProvider>
        )}

        {/* Nutriments Component */}
        <NutrimentsComponent data={dataProduct.nutriments} />
      </ProductDisplay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // Loading styles
  loadingContainer: {
    flex: 1,
  },
  loadingContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  loadingIconContainer: {
    marginBottom: 30,
  },
  loadingIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  loadingIndicatorContainer: {
    marginBottom: 40,
  },
  loadingIndicator: {
    transform: [{ scale: 1.5 }],
  },
  loadingSteps: {
    width: "100%",
    alignItems: "flex-start",
  },
  loadingStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  loadingStepText: {
    color: "white",
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
  },

  // Error styles
  errorContainer: {
    flex: 1,
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  errorDetails: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "monospace",
  },
  errorMessage: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    fontStyle: "italic",
  },

  // Empty state styles
  emptyContainer: {
    flex: 1,
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 24,
  },
});
