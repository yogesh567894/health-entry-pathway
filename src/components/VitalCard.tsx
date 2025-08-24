import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './Card';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

interface VitalCardProps {
  icon: string;
  title: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'error';
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

const VitalCard: React.FC<VitalCardProps> = ({
  icon,
  title,
  value,
  unit,
  status,
  color,
  trend = 'stable',
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return colors.medicalGreen;
      case 'warning':
        return colors.warning;
      case 'error':
        return colors.error;
      default:
        return colors.medicalGreen;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'trending-flat';
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Icon name={icon} size={24} color={color} />
        </View>
        <View style={styles.trendContainer}>
          <Icon name={getTrendIcon()} size={16} color={getStatusColor()} />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.status, { color: getStatusColor() }]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'flex-start',
  },
  value: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  unit: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  status: {
    ...typography.small,
    fontWeight: '600',
  },
});

export default VitalCard;