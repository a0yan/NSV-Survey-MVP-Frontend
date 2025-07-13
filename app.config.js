import 'dotenv/config'; // This line ensures dotenv is loaded for local development
export default {
  "expo": {
    "name": "Road Pulse",
    "slug": "NSV-Survey-MVP-Frontend",
    "version": "1.0.1",
    "orientation": "portrait",
    "icon": "./assets/images/icon_1.png",
    "scheme": "nsvsurveymvpfrontend",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.NSVSurveyMVPFrontend"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.NSVSurveyMVPFrontend",
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_API_KEY // Use your actual API key here
        }
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
  "expo-router",
  [
    "expo-splash-screen",
    {
      "image": "./assets/images/splash-icon.png",
      "imageWidth": 200,
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  ],
  [
    "expo-camera",
    {
      "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
      "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
      "recordAudioAndroid": true
    }
  ]
],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "b5f2786d-3409-429f-9097-6a030c0771c2"
      }
    }
  }
}
