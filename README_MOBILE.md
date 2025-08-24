# HealthMonitor React Native Mobile App

A comprehensive remote patient monitoring mobile application converted from the web version, optimized for iOS and Android platforms.

## 🚀 Features

### Core Functionality
- **Patient Authentication**: Phone number + OTP verification
- **Camera-based Vitals Capture**: Heart rate, SpO2, blood pressure, temperature
- **AI-powered Processing**: Advanced photoplethysmography (PPG) analysis
- **Real-time Results**: Comprehensive vitals dashboard with trends
- **Offline Support**: Local data caching and sync capabilities

### Mobile-Specific Enhancements
- **Native Navigation**: React Navigation with stack, tab, and modal patterns
- **Haptic Feedback**: Touch feedback for better user experience
- **Camera Permissions**: Proper permission handling for iOS/Android
- **Responsive Design**: Optimized for various screen sizes and orientations
- **Performance Optimized**: Lazy loading, image optimization, efficient rendering

## 📱 Platform Support

- **iOS**: 12.0+
- **Android**: API Level 21+ (Android 5.0)
- **React Native**: 0.73.2

## 🛠 Installation & Setup

### Prerequisites
```bash
# Install Node.js (16+)
# Install React Native CLI
npm install -g react-native-cli

# For iOS development
# Install Xcode 12+
# Install CocoaPods
sudo gem install cocoapods

# For Android development
# Install Android Studio
# Configure Android SDK (API 21+)
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd HealthMonitorRN

# Install dependencies
npm install

# iOS setup
cd ios && pod install && cd ..

# Android setup (if needed)
cd android && ./gradlew clean && cd ..
```

### Running the App
```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios
# or
react-native run-ios

# Run on Android
npm run android
# or
react-native run-android
```

## 🏗 Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── VitalCard.tsx
│   ├── VitalsChart.tsx
│   └── LoadingSpinner.tsx
├── screens/            # Screen components
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── OTPScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── VitalsScreen.tsx
│   ├── CameraScreen.tsx
│   ├── ProcessingScreen.tsx
│   └── ResultsScreen.tsx
├── navigation/         # Navigation configuration
│   └── MainNavigator.tsx
├── context/           # React Context providers
│   └── VitalsDemoContext.tsx
├── hooks/             # Custom React hooks
│   ├── usePermissions.ts
│   └── useVitalsCapture.ts
├── services/          # API and external services
│   ├── api.ts
│   └── storage.ts
├── styles/            # Design system
│   ├── colors.ts
│   ├── typography.ts
│   └── spacing.ts
└── utils/             # Utility functions
    ├── haptics.ts
    └── deviceInfo.ts
```

### Key Components

#### Navigation System
- **Stack Navigation**: Main app flow (Welcome → Login → OTP → Dashboard)
- **Tab Navigation**: Dashboard and Vitals tabs
- **Modal Navigation**: Camera interface and settings

#### State Management
- **Context API**: Demo settings and global state
- **Custom Hooks**: Permissions, vitals capture, device info
- **AsyncStorage**: Local data persistence

#### Mobile Optimizations
- **Responsive Design**: Adapts to different screen sizes
- **Performance**: Optimized rendering and memory management
- **Native Features**: Camera access, haptic feedback, device info

## 🔧 Configuration

### Environment Setup
Create `.env` file in project root:
```env
API_BASE_URL=https://your-api-endpoint.com
API_TIMEOUT=30000
ENABLE_FLIPPER=true
```

### Build Configuration

#### iOS (ios/HealthMonitorRN/Info.plist)
- Camera usage permissions
- App Transport Security settings
- Supported orientations

#### Android (android/app/src/main/AndroidManifest.xml)
- Camera and storage permissions
- Network security configuration
- App theme and launch settings

## 📊 API Integration

### Current Implementation
The app includes a complete service layer with mock implementations:

```typescript
// services/api.ts
export class ApiService {
  async sendOTP(phoneNumber: string): Promise<{success: boolean}> {
    // Mock implementation - replace with actual API
  }
  
  async processVitals(recordingId: string): Promise<VitalsData> {
    // Mock implementation - replace with actual API
  }
}
```

### Backend Integration Checklist
- [ ] Replace mock API calls with actual endpoints
- [ ] Implement JWT token management
- [ ] Add error handling and retry logic
- [ ] Configure network timeout and caching
- [ ] Add offline data synchronization

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests (if configured)
npm run test:e2e
```

### Test Structure
- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API service and navigation tests
- **E2E Tests**: Complete user flow testing

## 📦 Building for Production

### iOS Build
```bash
# Create release build
cd ios
xcodebuild -workspace HealthMonitorRN.xcworkspace \
  -scheme HealthMonitorRN \
  -configuration Release \
  -destination generic/platform=iOS \
  -archivePath HealthMonitorRN.xcarchive archive
```

### Android Build
```bash
# Create release APK
cd android
./gradlew assembleRelease

# Create release AAB (for Play Store)
./gradlew bundleRelease
```

## 🚀 Deployment

### App Store Deployment
1. Configure signing certificates in Xcode
2. Update version numbers in Info.plist
3. Create archive and upload to App Store Connect
4. Submit for review

### Google Play Deployment
1. Generate signed AAB file
2. Update version code in build.gradle
3. Upload to Google Play Console
4. Submit for review

## 🔒 Security Considerations

- **Data Encryption**: All sensitive data encrypted at rest
- **Network Security**: HTTPS only, certificate pinning
- **Authentication**: Secure token storage using Keychain/Keystore
- **Permissions**: Minimal required permissions requested
- **Code Obfuscation**: Production builds obfuscated

## 📈 Performance Optimization

### Implemented Optimizations
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Proper image sizing and caching
- **Memory Management**: Proper cleanup of listeners and timers
- **Bundle Splitting**: Separate bundles for different features
- **Native Modules**: Performance-critical code in native modules

### Monitoring
- **Crash Reporting**: Integrated crash analytics
- **Performance Monitoring**: App performance metrics
- **User Analytics**: Usage patterns and feature adoption

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

---

**Note**: This is a converted React Native version of the HealthMonitor web application. The mobile app includes additional features and optimizations specific to mobile platforms while maintaining the core functionality of the original web application.