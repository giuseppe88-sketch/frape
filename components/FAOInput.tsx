import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Ensure you have this library installed

export interface selectedFaoProps {
  label: string;
  value: string;
  latRange: { min: number; max: number };
  lonRange: { min: number; max: number };
  nameDataFile: string;
  location: string;
}

const FaoInput = React.memo(
  ({ onFaoSelect }: { onFaoSelect: (faoDetails: any) => void }) => {
    const [selectedFao, setSelectedFao] = React.useState<selectedFaoProps>({
      label: "",
      value: "",
      latRange: { min: 0, max: 0 },
      lonRange: { min: 0, max: 0 },
      nameDataFile: "",
      location: "",
    });

    const faoAreas = [
      {
        label: "FAO 18",
        value: "area18",

        lonRange: { min: -20, max: 15 },
        latRange: { min: 4, max: 25 },
        nameDataFile: "CMEMS_NorthwestAtlantic_bgc",
        location: "North West Atlantic Ocean",
      },
      {
        label: "FAO 21",
        value: "area21",
        lonRange: { min: -75, max: -40 },
        latRange: { min: 35, max: 70 },
        nameDataFile: "CMEMS_WestCentral_Atlantic_bgc",
        location: "West Central Atlantic Ocean",
      },
      {
        label: "FAO 27",
        value: "area27",
        area: "FAO_27",
        lonRange: { min: -25, max: 40 },
        latRange: { min: 35, max: 72 },
        nameDataFile: "CMEMS_NortheastAtlantic_bgc",
        location: "Northeast Atlantic Ocean",
      },
      {
        label: "FAO 31",
        area: "FAO_31",
        value: "area31",
        lonRange: { min: -100, max: -45 },
        latRange: { min: 10, max: 35 },
        nameDataFile: "CMEMS_SouthwestAtlantic_bgc",
        location: "Southwest Atlantic Ocean",
      },
      {
        label: "FAO 34",
        value: "area34",
        lonRange: { min: -35, max: 10 },
        latRange: { min: -10, max: 36 },
        nameDataFile: "CMEMS_SoutheastAtlantic",
        location: "Southeast Atlantic Ocean",
      },
      {
        label: "FAO 37",
        value: "area37",
        lonRange: { min: -20, max: 50 }, // Longitude range for the Mediterranean and Black Sea
        latRange: { min: 30, max: 45 }, // Latitude range for the Mediterranean and Black Sea
        nameDataFile: "CMEMS_Mediterranean_BlackSea_bgc", // Unique dataset name for FAO 37
        location: "Mediterranean and Black Sea",
      },
      {
        label: "FAO 41",
        value: "area41",
        lonRange: { min: -20, max: 10 }, // Longitude range for the Atlantic Southwest
        latRange: { min: 5, max: 30 }, // Latitude range for the Atlantic Southwest
        nameDataFile: "CMEMS_AtlanticSouthwest_bgc_fao41", // Unique dataset name for FAO 41
        location: "Atlantic Southwest",
      },
      {
        label: "FAO 47",
        value: "area47",
        lonRange: { min: 10, max: 60 }, // Longitude range for the Atlantic Southeast
        latRange: { min: -40, max: 5 }, // Latitude range for the Atlantic Southeast
        nameDataFile: "CMEMS_AtlanticSoutheast_bgc_fao47", // Unique dataset name for FAO 47
        location: "Atlantic Southeast",
      },
      {
        label: "FAO 48",
        value: "area48",
        lonRange: { min: -80, max: 10 }, // Longitude range for the Antarctic Atlantic
        latRange: { min: -90, max: -50 }, // Latitude range for the Antarctic Atlantic
        nameDataFile: "CMEMS_AntarcticAtlantic_bgc_fao48", // Unique dataset name for FAO 48
        location: "Antarctic Atlantic",
      },
      {
        label: "FAO 51",
        value: "area51",
        lonRange: { min: 40, max: 90 }, // Longitude range for the Western Indian Ocean
        latRange: { min: -40, max: 10 }, // Latitude range for the Western Indian Ocean
        nameDataFile: "CMEMS_WesternIndianOcean_bgc_fao51", // Unique dataset name for FAO 51
        location: "Western Indian Ocean",
      },
      {
        label: "FAO 57",
        value: "area57",
        lonRange: { min: 90, max: 160 }, // Longitude range for the Eastern Indian Ocean
        latRange: { min: -40, max: 10 }, // Latitude range for the Eastern Indian Ocean
        nameDataFile: "CMEMS_EasternIndianOcean_bgc_fao57", // Unique dataset name for FAO 57
        location: "Eastern Indian Ocean",
      },
      {
        label: "FAO 58",
        value: "area58",
        lonRange: { min: 90, max: 150 }, // Longitude range for the Southern Indian Ocean
        latRange: { min: -90, max: -50 }, // Latitude range for the Southern Indian Ocean
        nameDataFile: "CMEMS_SouthernIndianOcean_bgc_fao58", // Unique dataset name for FAO 58
        location: "Southern Indian Ocean",
      },
      {
        label: "FAO 61",
        value: "area61",
        lonRange: { min: 130, max: 180 }, // Longitude range for the Pacific Northwest
        latRange: { min: 30, max: 70 }, // Latitude range for the Pacific Northwest
        nameDataFile: "CMEMS_PacificNorthwest_bgc_fao61", // Unique dataset name for FAO 61
        location: "Pacific Northwest",
      },
      {
        label: "FAO 67",
        value: "area67",
        lonRange: { min: -180, max: -130 }, // Longitude range for the Pacific Northeast
        latRange: { min: 40, max: 70 }, // Latitude range for the Pacific Northeast
        nameDataFile: "CMEMS_PacificNortheast_bgc_fao67", // Unique dataset name for FAO 67
        location: "Pacific Northeast",
      },
      {
        label: "FAO 71",
        value: "area71",
        lonRange: { min: 120, max: 180 }, // Longitude range for the Pacific Western Central
        latRange: { min: -10, max: 20 }, // Latitude range for the Pacific Western Central
        nameDataFile: "CMEMS_PacificWesternCentral_bgc_fao71", // Unique dataset name for FAO 71
        location: "Pacific Western Central",
      },
      {
        label: "FAO 77",
        value: "area77",
        lonRange: { min: -140, max: -120 }, // Longitude range for the Pacific Eastern Central
        latRange: { min: -5, max: 15 }, // Latitude range for the Pacific Eastern Central
        nameDataFile: "CMEMS_PacificEasternCentral_bgc_fao77", // Unique dataset name for FAO 77
        location: "Pacific Eastern Central",
      },
      {
        label: "FAO 81",
        value: "area81",
        lonRange: { min: 140, max: 180 }, // Longitude range for the Pacific Southwest
        latRange: { min: -60, max: -30 }, // Latitude range for the Pacific Southwest
        nameDataFile: "CMEMS_PacificSouthwest_bgc_fao81", // Unique dataset name for FAO 81
        location: "Pacific Southwest",
      },
      {
        label: "FAO 87",
        value: "area87",
        lonRange: { min: -120, max: -70 }, // Longitude range for the Pacific Southeast
        latRange: { min: -60, max: -20 }, // Latitude range for the Pacific Southeast
        nameDataFile: "CMEMS_PacificSoutheast_bgc_fao87", // Unique dataset name for FAO 87
        location: "Pacific Southeast",
      },
      {
        label: "FAO 88",
        value: "area88",
        lonRange: { min: -180, max: 180 }, // Longitude range for the Pacific Antarctic
        latRange: { min: -90, max: -60 }, // Latitude range for the Pacific Antarctic
        nameDataFile: "CMEMS_PacificAntarctic_bgc_fao88", // Unique dataset name for FAO 88
        location: "Pacific Antarctic",
      },
    ];

    const handleFaoChange = (value: string) => {
      const parsedValue = JSON.parse(value);
      console.log(parsedValue); //
      setSelectedFao(parsedValue);
    };

    const handleFaoSelect = () => {
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
  }
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
  },
  picker: {
    height: 30,
    marginBottom: 20,
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
