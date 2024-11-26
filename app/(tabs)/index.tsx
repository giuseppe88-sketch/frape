import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";
import Title from "@/components/Title";

export interface dataGtinProps {
  data: any;
}
export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ data }: dataGtinProps) => {
    setScanned(false);
    setData(data);
    router.push({ pathname: "/explore", params: { gtin: data } });
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <Title />
      </View>
      <View style={styles.containerScan}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417", "ean13", "ean8"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
            color={"#000"}
          />
        )}
        <View style={styles.scanOverlay}>
          <Text style={styles.scanText}></Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30%",
        }}
      >
        <Text style={{ fontSize: 20, lineHeight: 30, color: "#666" }}>
          Scan the ean/gtin of the product to be redirect to the details section
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerScan: {
    marginTop: 5,
    flexDirection: "column",
    width: "100%",
    height: "50%",
    borderColor: "#ffff",
    borderWidth: 2,
    borderRadius: 10,
  },
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  scanText: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    width: "70%",
    height: "40%",
    borderWidth: 1,
    borderColor: "#ffff",
  },
  textTitle: {
    marginTop: 75,
    fontSize: 25,
    marginLeft: 5,
  },
});
