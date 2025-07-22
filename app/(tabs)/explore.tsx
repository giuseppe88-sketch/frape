import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { useLocalSearchParams } from "expo-router";
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

  const handleFaoSelect = async (selectedFao:any) => {
    setIsLoadingFao(true);
    setCatchLocation(selectedFao.location);
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
      <ActivityIndicator
        size="large"
        color={"green"}
        style={styles.loadingIndicator}
      />
    );
  }

  if (!dataProduct) {
    return null;
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
