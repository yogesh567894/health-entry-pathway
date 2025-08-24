import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
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

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const handleCaptureVitals = () => {
    navigation.navigate('Camera');
  };

  const vitalsData = [
    {
      icon: 'favorite',
      title: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      status: 'normal',
      color: colors.medicalRed,
    },
    {
      icon: 'opacity',
      title: 'Blood Oxygen',
      value: '98',
      unit: '%',
      status: 'normal',
      color: colors.primary,
    },
    {
      icon: 'show-chart',
      title: 'Blood Pressure',
      value: '118/78',
      unit: 'mmHg',
      status: 'optimal',
      color: colors.medicalGreen,
    },
    {
      icon: 'device-thermostat',
      title: 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'normal',
      color: colors.medicalOrange,
    },
  ];

  const recentActivity = [
    {
      icon: 'favorite',
      title: 'Heart rate recorded',
      subtitle: '72 BPM - 2 minutes ago',
      status: 'Normal',
      statusColor: colors.medicalGreen,
    },
    {
      icon: 'show-chart',
      title: 'Blood pressure measured',
      subtitle: '118/78 mmHg - 1 hour ago',
      status: 'Optimal',
      statusColor: colors.medicalGreen,
    },
    {
      icon: 'event',
      title: 'Appointment reminder',
      subtitle: 'Dr. Johnson tomorrow at 2:00 PM',
      status: 'Upcoming',
      statusColor: colors.primary,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back, Sarah!</Text>
            <Text style={styles.subGreeting}>Here's your health summary for today</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color={colors.textPrimary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Capture Vitals Button */}
        <Button
          title="Capture Vitals"
          onPress={handleCaptureVitals}
          size="large"
          style={styles.captureButton}
          icon={<Icon name="camera-alt" size={20} color={colors.white} style={{ marginRight: spacing.sm }} />}
        />

        {/* Vitals Grid */}
        <View style={styles.vitalsGrid}>
          {vitalsData.map((vital, index) => (
            <Card key={index} style={styles.vitalCard}>
              <View style={styles.vitalHeader}>
                <View style={[styles.vitalIcon, { backgroundColor: vital.color + '20' }]}>
                  <Icon name={vital.icon} size={24} color={vital.color} />
                </View>
                <Icon name="trending-up" size={16} color={colors.medicalGreen} />
              </View>
              <Text style={styles.vitalValue}>{vital.value}</Text>
              <Text style={styles.vitalUnit}>{vital.unit}</Text>
              <Text style={styles.vitalTitle}>{vital.title}</Text>
              <Text style={[styles.vitalStatus, { color: colors.medicalGreen }]}>
                {vital.status}
              </Text>
            </Card>
          ))}
        </View>

        {/* Health Summary */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Icon name="trending-up" size={20} color={colors.primary} />
            <Text style={styles.summaryTitle}>Health Summary</Text>
          </View>
          <View style={styles.summaryBadge}>
            <Text style={styles.summaryBadgeText}>Normal Range</Text>
          </View>
          <Text style={styles.summaryDescription}>
            All vitals are within healthy parameters
          </Text>
          <Text style={styles.summaryNote}>
            Your vital signs look good! Continue monitoring regularly and consult your healthcare 
            provider if you notice any concerning changes.
          </Text>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: activity.statusColor + '20' }]}>
                  <Icon name={activity.icon} size={20} color={activity.statusColor} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityItemTitle}>{activity.title}</Text>
                  <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
                </View>
                <View style={[styles.activityStatus, { backgroundColor: activity.statusColor + '20' }]}>
                  <Text style={[styles.activityStatusText, { color: activity.statusColor }]}>
                    {activity.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
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
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  subGreeting: {
    ...typography.bodySecondary,
  },
  notificationButton: {
    position: 'relative',
    padding: spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: colors.medicalRed,
    borderRadius: 4,
  },
  captureButton: {
    marginBottom: spacing.lg,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  vitalCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  vitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  vitalIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vitalValue: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  vitalUnit: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  vitalTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  vitalStatus: {
    ...typography.small,
    fontWeight: '600',
  },
  summaryCard: {
    marginBottom: spacing.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  summaryTitle: {
    ...typography.h4,
    marginLeft: spacing.sm,
  },
  summaryBadge: {
    backgroundColor: colors.medicalGreen + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  summaryBadgeText: {
    ...typography.small,
    color: colors.medicalGreen,
    fontWeight: '600',
  },
  summaryDescription: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  summaryNote: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  activityCard: {
    marginBottom: spacing.lg,
  },
  activityTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  activityList: {
    gap: spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityItemTitle: {
    ...typography.caption,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  activitySubtitle: {
    ...typography.small,
    color: colors.textSecondary,
  },
  activityStatus: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  activityStatusText: {
    ...typography.small,
    fontWeight: '600',
  },
});

export default DashboardScreen;