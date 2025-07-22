import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SelectedFaoProps } from "@/types/index";
import { faoAreas } from "@/data/faoAreas";

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
      <View style={styles.container}>
        <Text style={styles.label}>Select FAO Area</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={JSON.stringify(selectedFao)}
            onValueChange={handleFaoChange}
            style={styles.picker}
          >
            <Picker.Item label="Select FAO area" value={JSON.stringify({})} />
            {faoAreas.map((area, index) => (
              <Picker.Item
                key={index}
                label={area.label}
                value={JSON.stringify(area)}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={[styles.button, { opacity: selectedFao.value ? 1 : 0.5 }]}
          onPress={handleSubmit}
          disabled={!selectedFao.value}
        >
          <Text style={styles.buttonText}>Get Pollution Data</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 30,
  },
  button: {
    backgroundColor: "#0a7ea4",
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
