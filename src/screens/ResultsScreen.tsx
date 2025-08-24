import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import Button from '../components/Button';
import Card from '../components/Card';
import VitalCard from '../components/VitalCard';
import VitalsChart from '../components/VitalsChart';
import { RootStackParamList } from '../navigation/MainNavigator';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();

  // Mock realistic vitals data
  const vitals = {
    heartRate: 72,
    spO2: 98,
    bloodPressure: { systolic: 118, diastolic: 76 },
    temperature: 36.8,
    timestamp: new Date().toLocaleString(),
  };

  // Mock historical data for trends
  const trendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        data: [68, 70, 74, 69, 72],
        color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const getVitalStatus = (type: string, value: number | { systolic: number; diastolic: number }) => {
    switch (type) {
      case 'heartRate':
        const hr = value as number;
        if (hr >= 60 && hr <= 100) return { status: 'normal', color: colors.medicalGreen };
        return { status: 'warning', color: colors.warning };
      
      case 'spO2':
        const spo2 = value as number;
        if (spo2 >= 95) return { status: 'normal', color: colors.medicalGreen };
        return { status: 'warning', color: colors.warning };
      
      case 'bloodPressure':
        const bp = value as { systolic: number; diastolic: number };
        if (bp.systolic < 130 && bp.diastolic < 80) return { status: 'normal', color: colors.medicalGreen };
        return { status: 'warning', color: colors.warning };
      
      case 'temperature':
        const temp = value as number;
        if (temp >= 36.1 && temp <= 37.2) return { status: 'normal', color: colors.medicalGreen };
        return { status: 'warning', color: colors.warning };
      
      default:
        return { status: 'normal', color: colors.medicalGreen };
    }
  };

  const vitalsData = [
    {
      icon: 'favorite',
      title: 'Heart Rate',
      value: vitals.heartRate.toString(),
      unit: 'BPM',
      color: colors.medicalRed,
      status: getVitalStatus('heartRate', vitals.heartRate),
      trend: 'stable',
    },
    {
      icon: 'opacity',
      title: 'Blood Oxygen',
      value: vitals.spO2.toString(),
      unit: '%',
      color: colors.primary,
      status: getVitalStatus('spO2', vitals.spO2),
      trend: 'up',
    },
    {
      icon: 'show-chart',
      title: 'Blood Pressure',
      value: `${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic}`,
      unit: 'mmHg',
      color: colors.medicalGreen,
      status: getVitalStatus('bloodPressure', vitals.bloodPressure),
      trend: 'stable',
    },
    {
      icon: 'device-thermostat',
      title: 'Temperature',
      value: vitals.temperature.toString(),
      unit: '°C',
      color: colors.medicalOrange,
      status: getVitalStatus('temperature', vitals.temperature),
      trend: 'stable',
    },
  ];

  const handleExport = (format: 'pdf' | 'csv') => {
    // Mock export functionality
    Alert.alert(
      'Export',
      `Exporting vitals data as ${format.toUpperCase()}...`,
      [{ text: 'OK' }]
    );
  };

  const handleNewRecording = () => {
    navigation.navigate('Camera');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vitals Results</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Timestamp */}
        <Text style={styles.timestamp}>Recorded on {vitals.timestamp}</Text>

        {/* Vitals Grid */}
        <View style={styles.vitalsGrid}>
          {vitalsData.map((vital, index) => (
            <VitalCard
              key={index}
              icon={vital.icon}
              title={vital.title}
              value={vital.value}
              unit={vital.unit}
              status={vital.status.status as 'normal' | 'warning' | 'error'}
              color={vital.color}
              trend={vital.trend as 'up' | 'down' | 'stable'}
            />
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

        {/* 7-Day Trend Chart */}
        <VitalsChart
          data={trendData}
          title="7-Day Heart Rate Trend"
          height={200}
        />

        {/* Export Actions */}
        <View style={styles.exportSection}>
          <View style={styles.exportButtons}>
            <Button
              title="Export PDF"
              onPress={() => handleExport('pdf')}
              variant="outline"
              style={styles.exportButton}
              icon={<Icon name="picture-as-pdf" size={16} color={colors.primary} style={{ marginRight: spacing.sm }} />}
            />
            <Button
              title="Export CSV"
              onPress={() => handleExport('csv')}
              variant="outline"
              style={styles.exportButton}
              icon={<Icon name="table-chart" size={16} color={colors.primary} style={{ marginRight: spacing.sm }} />}
            />
          </View>
          
          <Button
            title="Take New Recording"
            onPress={handleNewRecording}
            size="large"
            style={styles.newRecordingButton}
          />
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  backButton: {
    padding: spacing.sm,
  },
  headerTitle: {
    ...typography.h3,
  },
  placeholder: {
    width: 40,
  },
  timestamp: {
    ...typography.bodySecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
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
  exportSection: {
    marginBottom: spacing.xl,
  },
  exportButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  exportButton: {
    flex: 1,
  },
  newRecordingButton: {
    width: '100%',
  },
});

export default ResultsScreen;