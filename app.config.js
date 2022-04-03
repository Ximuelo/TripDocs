// the dotenv/config will read your .env file 
// and merge it with process.env data
// This is just for the builds that happen outside of eas
import "dotenv/config";

// the secrets created with eas secret:create will
// be merged with process.env during eas builds
// const api_url = process.env.API_URL;

export default {
    "name": "tripdocs",
    "slug": "tripdocs",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
    },
    "updates": {
        "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
        "supportsTablet": true
    },
    "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/adaptive-icon.png",
            "backgroundColor": "#FFFFFF"
        },
        "package": "com.xiqufe.tripdocs"
    },
    "web": {
        "favicon": "./assets/favicon.png"
    },
    extra: {
        apiUrl: process.env.API_URL ?? 'http://51.103.128.156:5000/tripdocs',
        enableHiddenFeatures: false,
    }
};