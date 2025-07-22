export interface ProductInfo {
  title: string | null;
  brand: string | null;
  description: string | null;
  product_name: string | null;
  generic_name: string | null;
  brands: string | null;
  categories: string | null;
  ingredients_text: string | null;
  quantity: string | null;
  packaging: string | null;
  image_url: string;
  categories_tags: string | null;
  nutriments: NutritionDataProps["data"] | null;
  ecoscore_data: any | null;
  nutriscore: any | null;
  agribalyse: any | null;
  warning: string | null;
  labels: string | null;
  manufacturing_places: string | null;
  countries: string | null;
  subName: string | null;
  // Add any other fields you're interested in
}

export interface faoResultProps {
  pollutionEvents: number;
}

export interface FaoDetails {
  area: string;
  location: string;
}

export interface NutritionDataProps {
  data: {
    calcium?: number | null;
    calcium_100g?: number | null;
    calcium_serving?: number | null;
    calcium_unit?: string | null;
    calcium_value?: number | null;
    carbohydrates?: number | null;
    carbohydrates_100g?: number | null;
    carbohydrates_serving?: number | null;
    carbohydrates_unit?: string | null;
    carbohydrates_value?: number | null;
    cholesterol?: number | null;
    cholesterol_100g?: number | null;
    cholesterol_serving?: number | null;
    cholesterol_unit?: string | null;
    cholesterol_value?: number | null;
    energy?: number | null;
    "energy-kcal"?: number | null;
    "energy-kcal_100g"?: number | null;
    "energy-kcal_serving"?: number | null;
    "energy-kcal_unit"?: string | null;
    "energy-kcal_value"?: number | null;
    "energy-kcal_value_computed"?: number | null;
    energy_100g?: number | null;
    energy_serving?: number | null;
    energy_unit?: string | null;
    energy_value?: number | null;
    fat?: number | null;
    fat_100g?: number | null;
    fat_serving?: number | null;
    fat_unit?: string | null;
    fat_value?: number | null;
    fiber?: number | null;
    fiber_100g?: number | null;
    fiber_serving?: number | null;
    fiber_unit?: string | null;
    fiber_value?: number | null;
    "fruits-vegetables-legumes-estimate-from-ingredients_100g"?: number | null;
    "fruits-vegetables-legumes-estimate-from-ingredients_serving"?:
      | number
      | null;
    "fruits-vegetables-nuts-estimate-from-ingredients_100g"?: number | null;
    "fruits-vegetables-nuts-estimate-from-ingredients_serving"?: number | null;
    iron?: number | null;
    iron_100g?: number | null;
    iron_serving?: number | null;
    iron_unit?: string | null;
    iron_value?: number | null;
    "nova-group"?: number | null;
    "nova-group_100g"?: number | null;
    "nova-group_serving"?: number | null;
    "nutrition-score-fr"?: number | null;
    "nutrition-score-fr_100g"?: number | null;
    proteins?: number | null;
    proteins_100g?: number | null;
    proteins_serving?: number | null;
    proteins_unit?: string | null;
    proteins_value?: number | null;
    salt?: number | null;
    salt_100g?: number | null;
    salt_serving?: number | null;
    salt_unit?: string | null;
    salt_value?: number | null;
    "saturated-fat"?: number | null;
    "saturated-fat_100g"?: number | null;
    "saturated-fat_serving"?: number | null;
    "saturated-fat_unit"?: string | null;
    "saturated-fat_value"?: number | null;
    sodium?: number | null;
    sodium_100g?: number | null;
    sodium_serving?: number | null;
    sodium_unit?: string | null;
    sodium_value?: number | null;
    sugars?: number | null;
    sugars_100g?: number | null;
    sugars_serving?: number | null;
    sugars_unit?: string | null;
    sugars_value?: number | null;
    "trans-fat"?: number | null;
    "trans-fat_100g"?: number | null;
    "trans-fat_serving"?: number | null;
    "trans-fat_unit"?: string | null;
    "trans-fat_value"?: number | null;
    "vitamin-a"?: number | null;
    "vitamin-a_100g"?: number | null;
    "vitamin-a_serving"?: number | null;
    "vitamin-a_unit"?: string | null;
    "vitamin-a_value"?: number | null;
    "vitamin-c"?: number | null;
    "vitamin-c_100g"?: number | null;
    "vitamin-c_serving"?: number | null;
    "vitamin-c_unit"?: string | null;
    "vitamin-c_value"?: number | null;
  } | null;
}

export interface SelectedFaoProps {
  label: string;
  value: string;
  area?: string;
  latRange: { min: number; max: number };
  lonRange: { min: number; max: number };
  nameDataFile: string;
  location: string;
}
