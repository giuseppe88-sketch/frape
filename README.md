# FRAPE - Food Recognition and Pollution Evaluation

A React Native mobile application that combines food product analysis with environmental impact assessment, specifically focusing on seafood pollution data from FAO (Food and Agriculture Organization) fishing areas.

## What FRAPE Does

FRAPE is an innovative mobile app that helps users make informed decisions about food products by providing:

### Core Features

#### 1. Product Scanning & Recognition

- Barcode Scanner: Scan product barcodes using your device camera
- Product Information: Get detailed information about food products
- Nutritional Analysis: View comprehensive nutrition data including calories, fats, proteins, vitamins, and minerals

#### 2. Food Quality Assessment

- Nutri-Score: Visual representation of nutritional quality (A-E rating)
- Eco-Score: Environmental impact assessment of products
- Ingredients Analysis: Detailed breakdown of product ingredients
- Quality Indicators: Brand information, categories, manufacturing details

#### 3. Seafood Pollution Monitoring

- FAO Area Selection: Choose from 19 different FAO fishing zones worldwide
- Pollution Data: Real-time pollution events data for selected fishing areas
- Environmental Impact: Understand the environmental conditions of seafood origins
- Water Quality Assessment: Get insights into water quality levels in fishing zones

### Specialized Seafood Features

For seafood products, FRAPE provides additional environmental context:

- FAO Fishing Areas: Comprehensive database of major fishing zones
- Pollution Monitoring: Integration with CMEMS (Copernicus Marine Environment Monitoring Service) for real-time environmental data

- Location-Based Insights: Understand where your seafood comes from and the environmental conditions of those areas

## App Architecture

### Organized Codebase

```
/components/     # Reusable UI components
/types/          # Centralized TypeScript interfaces
/utils/          # Helper functions and utilities
/api/            # API integration modules
/data/           # Static data and configurations
/app/(tabs)/     # Main application screens
```

### Technology Stack

- React Native: Cross-platform mobile development
- TypeScript: Type-safe development
- Expo: Development and deployment platform
- React Native Paper: UI component library
- External APIs: Integration with food databases and environmental monitoring services

## User Experience

### Intuitive Interface

- Tab Navigation: Easy switching between scanning and exploration features
- Visual Indicators: Clear icons and color-coded information
- Responsive Design: Optimized for various screen sizes
- Loading States: Smooth user experience with proper loading indicators

### Information Hierarchy

- Product Overview: Brand, name, and basic information
- Nutritional Details: Comprehensive nutrition breakdown
- Environmental Impact: Eco-scores and sustainability metrics
- Seafood Specifics: FAO area data and pollution information (when applicable)

## Environmental Impact

FRAPE goes beyond traditional food apps by incorporating environmental consciousness:

- Sustainability Awareness: Help users understand the environmental impact of their food choices
- Ocean Health: Provide insights into marine pollution affecting seafood quality
- Informed Decisions: Enable users to make environmentally responsible food purchases

## Data Sources

- Food Product Database: Comprehensive product information and nutritional data
- FAO Fishing Areas: Official Food and Agriculture Organization fishing zone classifications
- CMEMS Data: Copernicus Marine Environment Monitoring Service for pollution tracking
- Nutri-Score System: European nutritional quality rating system
- Eco-Score System: Environmental impact assessment framework

---

## Getting Started

### 📱 Try FRAPE Now - Live Demo!

**🚀 The app is live and ready to use!** Follow these simple steps to try FRAPE on your mobile device:

#### Step 1: Install Expo Go

- **iOS**: Download [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from the App Store
- **Android**: Download [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Google Play Store

#### Step 2: Scan the QR Code

**📱 Scan this QR code with Expo Go:**

**🚀 Published App QR Code:**

```
https://qr.expo.dev/eas-update?projectId=a8005e98-86d5-44a2-8498-77179499e270&groupId=69a8dd5d-2812-4689-b09e-c83a0f8a97aa
```

> **For viewers:** Visit the URL above or scan the QR code it generates to access the live FRAPE app!

**Alternative:** Visit the project page directly at [https://expo.dev/accounts/giuseppe88/projects/frape](https://expo.dev/accounts/giuseppe88/projects/frape)

#### Step 3: Start Exploring! 🌊

- **Scan barcodes** of food products using your camera
- **Select FAO fishing areas** to get pollution data
- **Explore** comprehensive product information with modern ocean-themed UI

## License

_License information to be added_

## Contributing

_Contribution guidelines to be added_

---

**FRAPE** - Making food choices that are good for you and the planet!
