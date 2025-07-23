import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  SafeAreaView,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Title from "@/components/Title";

const { width, height } = Dimensions.get("window");

export interface dataGtinProps {
  data: any;
}

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string>("");
  const [scanAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();

    // Start scanning animation
    const animateScanner = () => {
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animateScanner());
    };

    animateScanner();
  }, []);

  const handleBarcodeScanned = async ({ data }: dataGtinProps) => {
    setScanned(true);
    setData(data);
    // Add haptic feedback
    router.push({ pathname: "/explore", params: { gtin: data } });
  };

  if (hasPermission === null) {
    return (
      <LinearGradient
        colors={["#0077be", "#00a8cc", "#0096c7"]}
        style={styles.permissionContainer}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.permissionContent}>
          <Ionicons name="camera-outline" size={80} color="white" />
          <Text style={styles.permissionText}>
            Requesting Camera Permission
          </Text>
          <Text style={styles.permissionSubtext}>
            We need access to your camera to scan barcodes
          </Text>
        </View>
      </LinearGradient>
    );
  }

  if (hasPermission === false) {
    return (
      <LinearGradient
        colors={["#d62828", "#f77f00", "#fcbf49"]}
        style={styles.permissionContainer}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.permissionContent}>
          <Ionicons name="camera-outline" size={80} color="white" />
          <Text style={styles.permissionText}>Camera Access Denied</Text>
          <Text style={styles.permissionSubtext}>
            Please enable camera permissions in settings
          </Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Open Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with gradient */}
      <LinearGradient
        colors={["#0077be", "#00a8cc", "#0096c7"]}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Title />
            <Text style={styles.headerSubtitle}>Ocean Product Scanner</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Camera Section */}
      <View style={styles.cameraSection}>
        <View style={styles.cameraContainer}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417", "ean13", "ean8"],
            }}
            style={styles.camera}
          />

          {/* Scanning Overlay */}
          <View style={styles.scanOverlay}>
            {/* Corner borders */}
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {/* Animated scanning line */}
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-100, 100],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>

            {/* Scan instruction */}
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Position barcode within the frame
              </Text>
            </View>
          </View>
        </View>

        {/* Scan Again Button */}
        {scanned && (
          <Animated.View style={styles.scanAgainContainer}>
            <TouchableOpacity
              style={styles.scanAgainButton}
              onPress={() => setScanned(false)}
            >
              <LinearGradient
                colors={["#0077be", "#00a8cc"]}
                style={styles.scanAgainGradient}
              >
                <Ionicons name="refresh" size={24} color="white" />
                <Text style={styles.scanAgainText}>Scan Again</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>

      {/* Bottom Section */}
      <LinearGradient
        colors={["#f8f9fa", "#e9ecef"]}
        style={styles.bottomSection}
      >
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name="scan" size={24} color="#0077be" />
            <Text style={styles.infoText}>Scan EAN/GTIN codes</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="water" size={24} color="#0077be" />
            <Text style={styles.infoText}>Get ocean pollution data</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="fish" size={24} color="#0077be" />
            <Text style={styles.infoText}>Discover product origins</Text>
          </View>
        </View>

        <View style={styles.tipContainer}>
          <Ionicons name="bulb-outline" size={20} color="#6c757d" />
          <Text style={styles.tipText}>
            Tip: Hold your device steady and ensure good lighting for best
            results
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // Permission screens
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContent: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  permissionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    textAlign: "center",
  },
  permissionSubtext: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },
  settingsButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  settingsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Header
  header: {
    paddingBottom: 20,
  },
  headerContent: {
    alignItems: "center",
    paddingTop: 10,
  },
  headerSubtitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    marginTop: 5,
    opacity: 0.9,
  },

  // Camera section
  cameraSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  camera: {
    flex: 1,
  },

  // Scan overlay
  scanOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: "relative",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00a8cc",
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#00a8cc",
    top: "50%",
    shadowColor: "#00a8cc",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  instructionContainer: {
    position: "absolute",
    bottom: -60,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  instructionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },

  // Scan again button
  scanAgainContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  scanAgainButton: {
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#0077be",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanAgainGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  scanAgainText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  // Bottom section
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 12,
    fontWeight: "500",
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(108, 117, 125, 0.1)",
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#0077be",
  },
  tipText: {
    fontSize: 14,
    color: "#6c757d",
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});
