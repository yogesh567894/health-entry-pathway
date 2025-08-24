import { Vibration, Platform } from 'react-native';

export class HapticsService {
  static light() {
    if (Platform.OS === 'ios') {
      // On iOS, you would use react-native-haptic-feedback
      // For now, we'll use basic vibration
      Vibration.vibrate(50);
    } else {
      Vibration.vibrate(50);
    }
  }

  static medium() {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(100);
    } else {
      Vibration.vibrate(100);
    }
  }

  static heavy() {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(200);
    } else {
      Vibration.vibrate(200);
    }
  }

  static success() {
    if (Platform.OS === 'ios') {
      Vibration.vibrate([100, 50, 100]);
    } else {
      Vibration.vibrate([100, 50, 100]);
    }
  }

  static error() {
    if (Platform.OS === 'ios') {
      Vibration.vibrate([200, 100, 200, 100, 200]);
    } else {
      Vibration.vibrate([200, 100, 200, 100, 200]);
    }
  }
}