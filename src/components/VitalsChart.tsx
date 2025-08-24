import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';

const screenWidth = Dimensions.get('window').width;

interface VitalsChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      color?: (opacity?: number) => string;
      strokeWidth?: number;
    }>;
  };
  title: string;
  height?: number;
}

const VitalsChart: React.FC<VitalsChartProps> = ({ 
  data, 
  title, 
  height = 200 
}) => {
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
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={data}
        width={screenWidth - (spacing.lg * 4)}
        height={height}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  title: {
    ...typography.h4,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
});

export default VitalsChart;