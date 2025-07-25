import { faoResultProps } from "@/types/index";

/**
 * FAO API configuration and endpoints
 */
const BASE_URL =
  process.env.EXPO_PUBLIC_BASE_URL ;

/**
 * Interface for FAO area details
 */
export interface FaoDetails {
  area: string;
  location: string;
}

/**
 * Fetches pollution data from FAO API based on area details
 * @param faoDetails - Object containing area and location information
 * @returns Promise<faoResultProps> - Pollution events data
 */
export async function fetchFaoPollutionData(
  faoDetails: FaoDetails
): Promise<faoResultProps> {
  console.log("faoDetails: ", faoDetails);
  try {
    const response = await fetch(`${BASE_URL}fetch-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        faoArea: faoDetails,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching FAO pollution data:", error);
    throw error;
  }
}
