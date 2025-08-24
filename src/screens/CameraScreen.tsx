import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Vibration,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Circle } from 'react-native-progress';

import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useVitalsDemo } from '../context/VitalsDemoContext';
import { usePermissions } from '../hooks/usePermissions';
import { useVitalsCapture } from '../hooks/useVitalsCapture';
import { RootStackParamList } from '../navigation/MainNavigator';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen: React.FC = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const { settings } = useVitalsDemo();
  const { cameraPermission, requestCameraPermission } = usePermissions();
  const {
    stage,
    progress,
    timeRemaining,
    error,
    startRecording,
    stopRecording,
    resetCapture,
  } = useVitalsCapture();
  
  const [permissionChecked, setPermissionChecked] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (settings.forceCameraPermissionDenied) {
      setPermissionChecked(true);
      return;
    }
    
    const status = await requestCameraPermission();
    setPermissionChecked(true);
    
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Please enable camera access in your device settings to capture vitals.',
        [
          { text: 'Cancel', onPress: () => navigation.goBack() },
          { text: 'Settings', onPress: () => {/* Open settings */} },
        ]
      );
    }
  };

  const handleStartRecording = async () => {
    if (settings.forceCameraPermissionDenied) {
      Alert.alert('Permission Denied', 'Camera permission denied. Please enable camera access.');
      return;
    }
    
    if (cameraPermission !== 'granted') {
      const status = await requestCameraPermission();
      if (status !== 'granted') {
        return;
      }
    }
    
    // Haptic feedback
    Vibration.vibrate(50);
    startRecording();
  };

  const handleStopRecording = () => {
    Vibration.vibrate(50);
    stopRecording();
  };

  const handleRetake = () => {
    resetCapture();
  };

  const handleContinue = () => {
    navigation.navigate('Processing');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!permissionChecked) {
    return <LoadingSpinner message="Checking camera permissions..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="close" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vitals Recording</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Error Banner */}
      {error && (
        <View style={styles.errorBanner}>
          <Icon name="error" size={20} color={colors.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Camera Preview Area */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraPreview}>
          {/* Simulated camera feed */}
          <View style={styles.cameraOverlay}>
            {/* Finger placement indicator */}
            <View style={styles.fingerIndicator}>
              <View style={[
                styles.fingerCircle,
                stage === 'recording' && styles.fingerCircleActive
              ]}>
                <Icon name="camera-alt" size={32} color={colors.white} />
                <Text style={styles.fingerText}>Place finger here</Text>
              </View>
            </View>
          </View>

          {/* Recording indicator */}
          {stage === 'recording' && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>REC</Text>
            </View>
          )}
        </View>

        {/* Instructions overlay */}
        <View style={styles.instructionsOverlay}>
          <View style={styles.instructionsCard}>
            {stage === 'ready' && (
              <Text style={styles.instructionsText}>
                Position your finger over the camera lens and tap Start
              </Text>
            )}
            {stage === 'recording' && (
              <View style={styles.recordingInstructions}>
                <Text style={styles.instructionsText}>Keep your finger still</Text>
                <Text style={styles.timerText}>{timeRemaining}s</Text>
              </View>
            )}
            {stage === 'complete' && (
              <Text style={[styles.instructionsText, { color: colors.medicalGreen }]}>
                Recording Complete!
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      {(stage === 'recording' || stage === 'complete') && (
        <View style={styles.progressContainer}>
          <Circle
            progress={progress / 100}
            size={80}
            thickness={4}
            color={colors.medicalGreen}
            unfilledColor={colors.border}
            borderWidth={0}
            showsText
            formatText={() => `${Math.round(progress)}%`}
            textStyle={styles.progressText}
          />
        </View>
      )}

      {/* Controls */}
      <View style={styles.controls}>
        {stage === 'ready' && (
          <View style={styles.controlsContainer}>
            <Button
              title="Start Recording"
              onPress={handleStartRecording}
              size="large"
              style={[styles.controlButton, { backgroundColor: colors.medicalGreen }]}
              icon={<Icon name="play-arrow" size={24} color={colors.white} style={{ marginRight: spacing.sm }} />}
            />
          </View>
        )}

        {stage === 'recording' && (
          <Button
            title="Stop Recording"
            onPress={handleStopRecording}
            size="large"
            style={[styles.controlButton, { backgroundColor: colors.medicalRed }]}
            icon={<Icon name="stop" size={24} color={colors.white} style={{ marginRight: spacing.sm }} />}
          />
        )}

        {stage === 'complete' && (
          <View style={styles.controlsContainer}>
            <Button
              title="Retake"
              onPress={handleRetake}
              variant="outline"
              style={styles.retakeButton}
              icon={<Icon name="refresh" size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />}
            />
            <Button
              title="Continue"
              onPress={handleContinue}
              size="large"
              style={styles.continueButton}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    ...typography.h4,
    color: colors.white,
  },
  placeholder: {
    width: 40,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error + '20',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginLeft: spacing.sm,
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  cameraPreview: {
    width: 320,
    height: 320,
    backgroundColor: colors.textSecondary,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    position: 'relative',
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(139,69,19,0.3)', // Brown tint for finger simulation
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerCircleActive: {
    borderColor: colors.medicalGreen,
    borderStyle: 'solid',
  },
  fingerText: {
    ...typography.caption,
    color: colors.white,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  recordingIndicator: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.medicalRed,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  recordingDot: {
    width: 8,
    height: 8,
    backgroundColor: colors.white,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  recordingText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '700',
  },
  instructionsOverlay: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.lg,
    right: spacing.lg,
  },
  instructionsCard: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  instructionsText: {
    ...typography.body,
    color: colors.white,
    textAlign: 'center',
  },
  recordingInstructions: {
    alignItems: 'center',
  },
  timerText: {
    ...typography.h1,
    color: colors.medicalGreen,
    marginTop: spacing.sm,
  },
  progressContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  progressText: {
    ...typography.caption,
    color: colors.white,
  },
  controls: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  controlsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  controlButton: {
    flex: 1,
  },
  retryButton: {
    flex: 1,
    borderColor: colors.white,
  },
  retakeButton: {
    flex: 1,
    borderColor: colors.white,
  },
  continueButton: {
    flex: 2,
  },
});

export default CameraScreen;