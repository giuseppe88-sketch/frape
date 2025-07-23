import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SelectedFaoProps } from "@/types/index";
import { faoAreas } from "@/data/faoAreas";

const { width } = Dimensions.get("window");

const FaoInput = React.memo(
  ({ onFaoSelect }: { onFaoSelect: (faoDetails: any) => void }) => {
    const [selectedFao, setSelectedFao] = React.useState<SelectedFaoProps>({
      label: "",
      value: "",
      latRange: { min: 0, max: 0 },
      lonRange: { min: 0, max: 0 },
      nameDataFile: "",
      location: "",
    });

    const handleFaoChange = (value: string) => {
      const parsedValue = JSON.parse(value);
      setSelectedFao(parsedValue);
    };

    const handleSubmit = () => {
      if (selectedFao.value) {
        onFaoSelect(selectedFao);
      }
    };

    return (
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <LinearGradient
            colors={["#0077be", "#00a8cc"]}
            style={styles.headerIconContainer}
          >
            <Ionicons name="location" size={20} color="white" />
          </LinearGradient>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Fishing Area Selection</Text>
            <Text style={styles.headerSubtitle}>
              Choose FAO fishing zone for pollution analysis
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Ionicons name="information-circle" size={16} color="#0077be" />
            <Text style={styles.infoText}>
              Select the FAO area where this seafood was caught
            </Text>
          </View>
          {selectedFao.location && (
            <View style={styles.infoItem}>
              <Ionicons name="pin" size={16} color="#52b788" />
              <Text style={styles.selectedLocationText}>
                Selected: {selectedFao.location}
              </Text>
            </View>
          )}
        </View>

        {/* Picker Section */}
        <View style={styles.pickerSection}>
          <Text style={styles.pickerLabel}>FAO Fishing Area</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={JSON.stringify(selectedFao)}
              onValueChange={handleFaoChange}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item
                label="🌊 Select FAO fishing area..."
                value={JSON.stringify({})}
                color="#6c757d"
              />
              {faoAreas.map((area, index) => (
                <Picker.Item
                  key={index}
                  label={`${area.label} - ${area.location}`}
                  value={JSON.stringify(area)}
                  color="#212529"
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { opacity: selectedFao.value ? 1 : 0.6 },
          ]}
          onPress={handleSubmit}
          disabled={!selectedFao.value}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={
              selectedFao.value
                ? ["#0077be", "#00a8cc", "#0096c7"]
                : ["#6c757d", "#adb5bd"]
            }
            style={styles.button}
          >
            <Ionicons
              name={selectedFao.value ? "analytics" : "lock-closed"}
              size={20}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {selectedFao.value
                ? "Analyze Water Quality"
                : "Select Area First"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Additional Info */}
        <View style={styles.footerInfo}>
          <Text style={styles.footerText}>
            💡 FAO areas help us determine the specific ocean region's pollution
            levels
          </Text>
        </View>
      </View>
    );
  }
);

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
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#495057",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  selectedLocationText: {
    fontSize: 14,
    color: "#52b788",
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
  },

  // Picker styles
  pickerSection: {
    marginBottom: 24,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212529",
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    overflow: "hidden",
  },
  picker: {
    height: 70,
    width: "100%",
  },
  pickerItem: {
    fontSize: 16,
    height: 70,
  },

  // Button styles
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minHeight: 56,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  // Footer styles
  footerInfo: {
    backgroundColor: "rgba(0, 119, 190, 0.05)",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#0077be",
  },
  footerText: {
    fontSize: 13,
    color: "#495057",
    lineHeight: 18,
    fontStyle: "italic",
  },
});

export default FaoInput;
