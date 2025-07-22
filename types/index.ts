import { NutritionDataProps } from "@/components/NutrimentsComponent";

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
