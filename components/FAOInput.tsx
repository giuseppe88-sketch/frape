import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Ensure you have this library installed

const FaoInput = ({ onFaoSelect }: any) => {
  const [selectedFao, setSelectedFao] = React.useState<any>({
    label: "",
    value: "",
    latRange: { min: 0, max: 0 },
    lonRange: { min: 0, max: 0 },
  });

  // Mock FAO areas data
  const faoAreas = [
    {
      label: "FAO 18",
      value: "area18",
      lonRange: { min: -20, max: 15 },
      latRange: { min: 4, max: 25 },
    },
    {
      label: "FAO 21",
      value: "area21",
      lonRange: { min: -85, max: -60 },
      latRange: { min: 10, max: 35 },
    },
    {
      label: "FAO 27",
      value: "area27",
      lonRange: { min: -25, max: 40 },
      latRange: { min: 35, max: 72 },
    },
    {
      label: "FAO 31",
      value: "area31",
      lonRange: { min: -100, max: -45 },
      latRange: { min: 10, max: 35 },
    },
    {
      label: "FAO 34",
      value: "area34",
      lonRange: { min: -35, max: 10 },
      latRange: { min: -10, max: 36 },
    },
  ];

  const handleFaoChange = (value: string) => {
    const parsedValue = JSON.parse(value);
    console.log(parsedValue)
    setSelectedFao(parsedValue);
  };

  const handleFaoSelect = () => {
    console.log("Selected FAO Details:", selectedFao);
    onFaoSelect(selectedFao);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select FAO Area</Text>
      <Picker
        selectedValue={JSON.stringify(selectedFao)}
        onValueChange={handleFaoChange}
        style={styles.picker}
      >
        <Picker.Item label="Select FAO area" value={JSON.stringify({})} />
        {faoAreas.map((area) => (
          <Picker.Item
            key={area.value}
            label={area.label}
            value={JSON.stringify(area)}
          />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleFaoSelect}>
        <Text style={styles.buttonText}>Confirm FAO Area</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 140,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default FaoInput;
