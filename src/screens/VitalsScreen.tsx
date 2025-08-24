import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
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

type VitalsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const VitalsScreen: React.FC = () => {
  const navigation = useNavigation<VitalsScreenNavigationProp>();
  const { settings, setSettings } = useVitalsDemo();
  const [showDemoPanel, setShowDemoPanel] = React.useState(false);

  const handleStartCapture = () => {
    navigation.navigate('Camera');
  };

  const handleViewResults = () => {
    navigation.navigate('Results');
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ [key]: !settings[key] });
  };

  const demoSettings = [
    { key: 'fastMode', label: 'Fast Mode', value: settings.fastMode },
    { key: 'forceCameraPermissionDenied', label: 'Camera Permission Error', value: settings.forceCameraPermissionDenied },
    { key: 'forceUploadFailure', label: 'Upload Failure', value: settings.forceUploadFailure },
    { key: 'forceProcessingTimeout', label: 'Processing Timeout', value: settings.forceProcessingTimeout },
    { key: 'forceNetworkIssue', label: 'Network Issue', value: settings.forceNetworkIssue },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header with Demo Controls */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Icon name="favorite" size={32} color={colors.white} />
            </View>
            <View>
              <Text style={styles.title}>HealthMonitor</Text>
              <Text style={styles.subtitle}>Remote Patient Monitoring</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowDemoPanel(true)}
          >
            <Icon name="settings" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Main Card */}
        <Card style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Vitals Capture</Text>
            <Text style={styles.cardDescription}>
              Place your finger on the camera to measure your heart rate, oxygen saturation, and other vital signs.
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              title="Start Vitals Recording"
              onPress={handleStartCapture}
              size="large"
              style={styles.primaryButton}
              icon={<Icon name="favorite" size={20} color={colors.white} style={{ marginRight: spacing.sm }} />}
            />
            
            <Button
              title="View Last Results"
              onPress={handleViewResults}
              variant="outline"
              size="large"
              style={styles.secondaryButton}
              icon={<Icon name="trending-up" size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />}
            />
          </View>
        </Card>

        {/* Instructions */}
        <Card style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>How it works:</Text>
          <View style={styles.instructionsList}>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>1</Text>
              </View>
              <Text style={styles.instructionText}>Place your finger gently on the rear camera</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <Text style={styles.instructionText}>Keep still for 30 seconds during recording</Text>
            </View>
            <View style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <Text style={styles.instructionText}>Review your vitals and health trends</Text>
            </View>
          </View>
        </Card>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <Icon name="schedule" size={24} color={colors.primary} />
            <Text style={styles.statValue}>30s</Text>
            <Text style={styles.statLabel}>Recording Time</Text>
          </Card>
          <Card style={styles.statCard}>
            <Icon name="favorite" size={24} color={colors.primary} />
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Vital Signs</Text>
          </Card>
        </View>

        {/* Demo Controls Modal */}
        <Modal
          visible={showDemoPanel}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowDemoPanel(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Demo Controls</Text>
              <TouchableOpacity onPress={() => setShowDemoPanel(false)}>
                <Icon name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {demoSettings.map((setting) => (
                <View key={setting.key} style={styles.settingItem}>
                  <Text style={styles.settingLabel}>{setting.label}</Text>
                  <TouchableOpacity
                    style={[styles.toggle, setting.value && styles.toggleActive]}
                    onPress={() => toggleSetting(setting.key as keyof typeof settings)}
                  >
                    <View style={[styles.toggleThumb, setting.value && styles.toggleThumbActive]} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 64,
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySecondary,
    fontSize: 16,
  },
  settingsButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.surface,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mainCard: {
    marginBottom: spacing.lg,
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  cardDescription: {
    ...typography.bodySecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
  },
  instructionsCard: {
    marginBottom: spacing.lg,
  },
  instructionsTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  instructionsList: {
    gap: spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '700',
  },
  instructionText: {
    ...typography.body,
    flex: 1,
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statValue: {
    ...typography.h2,
    marginVertical: spacing.sm,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h3,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    ...typography.body,
  },
  toggle: {
    width: 44,
    height: 24,
    backgroundColor: colors.border,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});

export default VitalsScreen;