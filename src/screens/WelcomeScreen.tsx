import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '../components/Button';
import Card from '../components/Card';
import { RootStackParamList } from '../navigation/MainNavigator';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Icon name="favorite" size={48} color={colors.white} />
          </View>
          <Text style={styles.title}>HealthMonitor</Text>
          <Text style={styles.subtitle}>Remote Patient Monitoring</Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Card style={styles.featureCard}>
            <View style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Icon name="timeline" size={24} color={colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Real-time Monitoring</Text>
                <Text style={styles.featureDescription}>
                  Track your vital signs 24/7 with advanced AI analysis
                </Text>
              </View>
            </View>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Icon name="security" size={24} color={colors.medicalGreen} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Secure & Private</Text>
                <Text style={styles.featureDescription}>
                  HIPAA compliant platform with end-to-end encryption
                </Text>
              </View>
            </View>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureRow}>
              <View style={styles.featureIcon}>
                <Icon name="camera-alt" size={24} color={colors.medicalOrange} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Camera-based Vitals</Text>
                <Text style={styles.featureDescription}>
                  Measure heart rate and oxygen levels using your phone camera
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            size="large"
            style={styles.ctaButton}
          />
          
          <Text style={styles.disclaimer}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
    marginTop: spacing.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodySecondary,
    fontSize: 18,
  },
  featuresSection: {
    marginBottom: spacing.xxxl,
  },
  featureCard: {
    marginBottom: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.primaryLight,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    ...typography.h4,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    ...typography.bodySecondary,
  },
  ctaSection: {
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  disclaimer: {
    ...typography.small,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;