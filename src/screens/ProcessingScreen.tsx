import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/Button';
import Card from '../components/Card';
import { useVitalsDemo } from '../context/VitalsDemoContext';
import { RootStackParamList } from '../navigation/MainNavigator';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

type ProcessingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Processing'>;

interface ProcessingStep {
  icon: string;
  label: string;
  duration: number;
}

const ProcessingScreen: React.FC = () => {
  const navigation = useNavigation<ProcessingScreenNavigationProp>();
  const { settings } = useVitalsDemo();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const steps: ProcessingStep[] = [
    { icon: 'cloud-upload', label: 'Uploading Video', duration: 3000 },
    { icon: 'psychology', label: 'Analyzing Signal', duration: 7000 },
    { icon: 'favorite', label: 'Extracting Vitals', duration: 5000 },
  ];

  useEffect(() => {
    if (error) return;

    const multiplier = settings.fastMode ? 0.3 : 1;
    const scaledSteps = steps.map((s) => ({ ...s, duration: s.duration * multiplier }));
    const totalDuration = scaledSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 100;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update current step based on elapsed time
      let stepElapsed = 0;
      for (let i = 0; i < scaledSteps.length; i++) {
        if (elapsed <= stepElapsed + scaledSteps[i].duration) {
          setCurrentStep(i);
          break;
        }
        stepElapsed += scaledSteps[i].duration;
      }

      // Inject demo error states
      if (settings.forceUploadFailure && elapsed >= scaledSteps[0].duration) {
        clearInterval(interval);
        setError('Upload failed. Please try again.');
        return;
      }
      if (settings.forceNetworkIssue && newProgress >= 50) {
        clearInterval(interval);
        setError('Network issue detected. Check your connection and retry.');
        return;
      }
      if (settings.forceProcessingTimeout && newProgress >= 85) {
        clearInterval(interval);
        setError('Processing timed out. Please try again.');
        return;
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => navigation.navigate('Results'), 500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [navigation, settings, error]);

  const handleRetry = () => {
    setError(null);
    setProgress(0);
    setCurrentStep(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Icon name="favorite" size={40} color={colors.white} />
        </View>

        <Text style={styles.title}>Processing Your Vitals</Text>
        <Text style={styles.subtitle}>
          Please wait while we analyze your recording using advanced AI algorithms.
        </Text>

        {error && (
          <Card style={styles.errorCard}>
            <View style={styles.errorContent}>
              <Icon name="error" size={24} color={colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </Card>
        )}

        {/* Progress Steps */}
        {!error && (
          <View style={styles.stepsContainer}>
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <Card
                  key={index}
                  style={[
                    styles.stepCard,
                    isActive && styles.stepCardActive,
                    isComplete && styles.stepCardComplete,
                  ]}
                >
                  <View style={styles.stepContent}>
                    <View style={[
                      styles.stepIcon,
                      isActive && styles.stepIconActive,
                      isComplete && styles.stepIconComplete,
                    ]}>
                      {isComplete ? (
                        <Icon name="check-circle" size={24} color={colors.white} />
                      ) : (
                        <Icon 
                          name={step.icon} 
                          size={24} 
                          color={isActive ? colors.white : colors.textTertiary} 
                        />
                      )}
                    </View>
                    <View style={styles.stepText}>
                      <Text style={[
                        styles.stepLabel,
                        isActive && styles.stepLabelActive,
                        isComplete && styles.stepLabelComplete,
                      ]}>
                        {step.label}
                      </Text>
                      {isActive && (
                        <Text style={styles.stepStatus}>Processing...</Text>
                      )}
                      {isComplete && (
                        <Text style={styles.stepStatusComplete}>Complete</Text>
                      )}
                    </View>
                    {isActive && (
                      <ActivityIndicator size="small" color={colors.primary} />
                    )}
                  </View>
                </Card>
              );
            })}
          </View>
        )}

        {/* Overall Progress */}
        {!error && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressValue}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
          </View>
        )}

        {error && (
          <Button
            title="Retry"
            onPress={handleRetry}
            size="large"
            style={styles.retryButton}
          />
        )}

        {/* Technical Note */}
        <Card style={styles.techNote}>
          <Text style={styles.techNoteTitle}>Processing with AI:</Text>
          <Text style={styles.techNoteText}>
            We use photoplethysmography (PPG) technology to detect blood volume changes through 
            your camera's light sensor.
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  errorCard: {
    width: '100%',
    backgroundColor: colors.error + '10',
    borderColor: colors.error + '30',
    marginBottom: spacing.lg,
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    marginLeft: spacing.sm,
    flex: 1,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  stepCard: {
    borderWidth: 2,
    borderColor: colors.border,
  },
  stepCardActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  stepCardComplete: {
    backgroundColor: colors.medicalGreen + '10',
    borderColor: colors.medicalGreen + '30',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepIconActive: {
    backgroundColor: colors.primary,
  },
  stepIconComplete: {
    backgroundColor: colors.medicalGreen,
  },
  stepText: {
    flex: 1,
  },
  stepLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textTertiary,
  },
  stepLabelActive: {
    color: colors.primary,
  },
  stepLabelComplete: {
    color: colors.medicalGreen,
  },
  stepStatus: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  stepStatusComplete: {
    ...typography.caption,
    color: colors.medicalGreen,
    marginTop: spacing.xs,
  },
  progressSection: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  progressLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  progressValue: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  retryButton: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  techNote: {
    width: '100%',
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary + '30',
  },
  techNoteTitle: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  techNoteText: {
    ...typography.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});

export default ProcessingScreen;