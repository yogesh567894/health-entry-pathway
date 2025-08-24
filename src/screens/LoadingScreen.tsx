import React, { useEffect } from 'react';
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

import { RootStackParamList } from '../navigation/MainNavigator';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

type LoadingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Loading'>;

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<LoadingScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Animated Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Icon name="favorite" size={40} color={colors.white} />
          </View>
          <View style={styles.successBadge}>
            <Icon name="check-circle" size={20} color={colors.white} />
          </View>
        </View>

        {/* Loading Text */}
        <Text style={styles.title}>Verification Successful!</Text>
        <Text style={styles.subtitle}>Setting up your patient dashboard...</Text>

        {/* Loading Spinner */}
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>

        {/* Progress Steps */}
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <Icon name="check-circle" size={16} color={colors.medicalGreen} />
            <Text style={styles.stepText}>Phone number verified</Text>
          </View>
          <View style={styles.step}>
            <Icon name="check-circle" size={16} color={colors.medicalGreen} />
            <Text style={styles.stepText}>Secure connection established</Text>
          </View>
          <View style={styles.step}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.stepText}>Loading dashboard...</Text>
          </View>
        </View>
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
  logoSection: {
    position: 'relative',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    backgroundColor: colors.medicalGreen,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.bodySecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  spinnerContainer: {
    marginBottom: spacing.xl,
  },
  stepsContainer: {
    alignItems: 'flex-start',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stepText: {
    ...typography.caption,
    marginLeft: spacing.sm,
    color: colors.textSecondary,
  },
});

export default LoadingScreen;