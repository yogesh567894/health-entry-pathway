import { useState, useEffect } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'never_ask_again' | 'unavailable';

interface UsePermissionsReturn {
  cameraPermission: PermissionStatus;
  requestCameraPermission: () => Promise<PermissionStatus>;
  checkCameraPermission: () => Promise<PermissionStatus>;
}

export const usePermissions = (): UsePermissionsReturn => {
  const [cameraPermission, setCameraPermission] = useState<PermissionStatus>('unavailable');

  const checkCameraPermission = async (): Promise<PermissionStatus> => {
    try {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        const status: PermissionStatus = result ? 'granted' : 'denied';
        setCameraPermission(status);
        return status;
      } else {
        // For iOS, we'll assume permission is available
        // In a real app, you'd use react-native-permissions
        setCameraPermission('granted');
        return 'granted';
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
      setCameraPermission('unavailable');
      return 'unavailable';
    }
  };

  const requestCameraPermission = async (): Promise<PermissionStatus> => {
    try {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'HealthMonitor needs access to your camera to capture vitals',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        let status: PermissionStatus;
        switch (result) {
          case PermissionsAndroid.RESULTS.GRANTED:
            status = 'granted';
            break;
          case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
            status = 'never_ask_again';
            break;
          default:
            status = 'denied';
        }

        setCameraPermission(status);
        return status;
      } else {
        // For iOS, we'll simulate permission request
        setCameraPermission('granted');
        return 'granted';
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setCameraPermission('denied');
      return 'denied';
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return {
    cameraPermission,
    requestCameraPermission,
    checkCameraPermission,
  };
};