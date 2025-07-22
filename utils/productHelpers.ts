/**
 * Utility functions for product data processing and mapping
 */

/**
 * Maps eco score data to EPI score string
 */
export function mapEcoScores(data: any): string {
  let ecoscoreData = Object.entries(
    data.ecoscore_data.adjustments.origins_of_ingredients
  );
  const epiScoreEntry = ecoscoreData.find((entry) => entry[0] === "epi_score");
  if (epiScoreEntry) {
    return `${epiScoreEntry[1]}/100`;
  } else {
    return "No EPI score found.";
  }
}

/**
 * Maps eco value data to EPI value string
 */
export function mapEcoValue(data: any): string {
  let ecoscoreData = Object.entries(
    data.ecoscore_data.adjustments.origins_of_ingredients
  );
  const epiScoreEntry = ecoscoreData.find((entry) => entry[0] === "epi_value");
  if (epiScoreEntry) {
    return `${epiScoreEntry[1]}/100`;
  } else {
    return "No EPI value found.";
  }
}

/**
 * Maps nutri-score grade to corresponding image asset
 */
export function mapNutriScore(grade: string) {
  switch (grade.toLowerCase()) {
    case "a":
      return require("../assets/a-nutri-score.png");
    case "b":
      return require("../assets/a-nutri-score.png");
    case "c":
      return require("../assets/a-nutri-score.png");
    case "d":
      return require("../assets/a-nutri-score.png");
    case "e":
      return require("../assets/a-nutri-score.png");
    default:
      return null; // or a default placeholder image
  }
}

/**
 * Determines water quality level based on pollution input
 */
export function getWaterQualityLevel(inputResultPollution: any): string {
  if (inputResultPollution == null) return "";

  if (inputResultPollution >= 0 && inputResultPollution <= 50) {
    return "Low";
  } else if (inputResultPollution > 50 && inputResultPollution <= 200) {
    return "Moderate";
  } else if (inputResultPollution > 200) {
    return "High";
  } else {
    return ""; // Fallback case
  }
}

/**
 * Checks if a product belongs to seafood category
 */
export function isSeafood(categories: any): boolean {
  if (categories && categories.includes("en:seafood")) {
    return true;
  } else {
    return false;
  }
}
