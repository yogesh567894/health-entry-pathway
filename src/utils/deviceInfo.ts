import { Dimensions, Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export interface DeviceInfoType {
  screenWidth: number;
  screenHeight: number;
  isTablet: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  statusBarHeight: number;
  deviceId: string;
  appVersion: string;
  buildNumber: string;
}

class DeviceInfoService {
  private static instance: DeviceInfoService;
  private deviceInfo: DeviceInfoType | null = null;

  static getInstance(): DeviceInfoService {
    if (!DeviceInfoService.instance) {
      DeviceInfoService.instance = new DeviceInfoService();
    }
    return DeviceInfoService.instance;
  }

  async getDeviceInfo(): Promise<DeviceInfoType> {
    if (this.deviceInfo) {
      return this.deviceInfo;
    }

    const { width, height } = Dimensions.get('window');
    const isTablet = await DeviceInfo.isTablet();
    const deviceId = await DeviceInfo.getUniqueId();
    const appVersion = DeviceInfo.getVersion();
    const buildNumber = DeviceInfo.getBuildNumber();

    this.deviceInfo = {
      screenWidth: width,
      screenHeight: height,
      isTablet,
      isIOS: Platform.OS === 'ios',
      isAndroid: Platform.OS === 'android',
      statusBarHeight: StatusBar.currentHeight || 0,
      deviceId,
      appVersion,
      buildNumber,
    };

    return this.deviceInfo;
  }

  getScreenDimensions() {
    return Dimensions.get('window');
  }

  isSmallScreen(): boolean {
    const { width } = Dimensions.get('window');
    return width < 375; // iPhone SE and smaller
  }

  isLargeScreen(): boolean {
    const { width } = Dimensions.get('window');
    return width > 414; // iPhone Plus and larger
  }
}

export const deviceInfoService = DeviceInfoService.getInstance();