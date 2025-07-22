import { faoResultProps } from "@/types/index";

/**
 * FAO API configuration and endpoints
 */
const BASE_URL = "https://b2089b69383e.ngrok-free.app/";
// Alternative URLs for different environments:
// "https://frape-be-giuseppe88sketchs-projects.vercel.app/";
// "https://cc32-2a00-20-6011-7579-b5b2-31cf-e76f-bea1.ngrok-free.app/";

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
  try {
    console.log("faoDetails.area", faoDetails.area);

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
    console.log("FAO API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching FAO pollution data:", error);
    throw error;
  }
}
