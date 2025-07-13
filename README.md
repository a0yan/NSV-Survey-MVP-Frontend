# 🛣️ NSV Highway Inspection App

A mobile-first field survey application for **highway inspection and reporting**, built with **React Native** using **Expo Go**. Designed for use by surveyors, engineers, and supervisors real-time field conditions.

---

## 📱 Features

- 📍 **GPS-based chainage detection**
- 🗺️ **Interactive map with real-time location**
- 📷 **Live Inspection video capture**
- 🧰 **Role-based access (Surveyor, Engineer, Supervisor)**
- 📤 **API-integrated report submission**

---

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
npm install
# or
yarn

2. Start the Project

npx expo start

Scan the QR code using the Expo Go app on your mobile device.

    💡 Make sure your phone and development machine are on the same Wi-Fi network.

🧪 Development Environment

    Framework: React Native

    Tooling: Expo (Managed workflow)

    UI: NativeWind + Gluestack

    Maps: react-native-maps + Google Maps

    Location: expo-location

    Media Capture: expo-camera, expo-media-library

    Navigation: Expo Router (or React Navigation)

📁 Project Structure

/components         # Reusable UI components
/screens            # App screens like Login, Dashboard, Survey
/hooks              # Custom React hooks (e.g., useLocationTracker)
/assets             # Icons, logos, images
/app.config.js      # Expo configuration

🔑 Environment Variables

Create a .env file in the root directory:

EXPO_PUBLIC_API_URL=backend_api_url
EXPO_PUBLIC_APP_ENV=dev
EXPO_PUBLIC_GOOGLE_API_KEY=your_google_api_key_here

    ✅ Used for maps, reverse geocoding, etc.

📦 Building the App
Android (APK)

npx expo prebuild --platform android
cd android
./gradlew assembleRelease --parallel

cd app/build/outputs/release
// Move the apk file to your device

🧩 Future Roadmap

Background location tracking

Offline form queue & sync


    Supervisor approval workflow

👨‍💻 Developed By

Ayan Shrivastava & Harshal Bharatkar
Built with ♥️ to digitize highway inspections and improve road safety.
