// import { ProductInfo } from '../types';
//https://api.upcitemdb.com/prod/trial/lookup?upc=9781781250914

// const API_BASE_URL = `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`;
//`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
export async function fetchProductInfo(barcode: string) {
  try {
    const response = await fetch(
      `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
    );
    if (!response.ok) {
      throw new Error("Product not found");
    }
    const data = await response.json();
    // alert("from api data: " + JSON.stringify(data.items[0], null, 2)); // Adding 2 spaces indentation for readability
    return data.items[0];
  } catch (error) {
    console.error("Error fetching product info:", error);
    throw error;
  }
}
export async function fetchProductOpenFoodInfo(barcode: string) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    if (!response.ok) {
      throw new Error("Product not found");
    }
    const data = await response.json();
    // alert("from api open food: " + JSON.stringify(data.product, null, 2)); // Adding 2 spaces indentation for readability
    return data.product;
  } catch (error) {
    console.error("Error fetching product info:", error);
    throw error;
  }
}
