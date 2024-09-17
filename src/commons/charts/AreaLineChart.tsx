import {MessagerIcon} from '@/assets/svg';
import {colors} from '@/themes/colors';
import React, {JSX, memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

type AreaLineChartProps = {
  data: {value: number; title: string}[];
  xAxisLabels: string[];
  typeTransaction: string;
  maxValue: number;
};

const AreaLineChart = ({
  data,
  xAxisLabels,
  typeTransaction,
  maxValue,
}: AreaLineChartProps): JSX.Element => {
  const {t} = useTranslation();
  const {width} = Dimensions.get('window');
  const [focusedLabelIndex, setFocusedLabelIndex] = useState<number | null>(
    null,
  );

  const labelIndexMap = xAxisLabels.reduce((acc, label, index) => {
    acc[label] = index;
    return acc;
  }, {} as Record<string, number>);

  const handleFocus = (dataPoint: {title: string; value: number}) => {
    const index = labelIndexMap[dataPoint.title];
    setFocusedLabelIndex(index !== undefined ? index : null);
  };

  const xAxisLabelColors = xAxisLabels.map((_, index) =>
    index === focusedLabelIndex ? colors.goldenRod : colors.pureWhite,
  );

  const chartData = data.map(item => ({
    ...item,
    value: item.value,
    dataPointLabelComponent: () => customTooltip(item.value),
  }));

  const customTooltip = (value: number) => {
    return (
      <View style={styles.tooltipContainer}>
        <View style={styles.boxTooltip}>
          <MessagerIcon />
          <Text style={styles.txtTooltip}>
            {typeTransaction === 'income' ? '+' : '-'}
            {t('currency')}
            {value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={width + 10}
        height={280}
        showVerticalLines
        curved
        color="yellow"
        thickness={3}
        hideYAxisText
        xAxisColor="transparent"
        yAxisColor="transparent"
        isAnimated
        animationDuration={3000}
        hideDataPoints={false}
        areaChart
        showDataPointLabelOnFocus
        rulesLength={100}
        maxValue={maxValue + 1000}
        trimYAxisAtTop
        yAxisLabelWidth={-25}
        dataPointsColor={colors.pureWhite}
        disableScroll
        showScrollIndicator={false}
        verticalLinesHeight={1}
        onlyPositive
        hideRules
        hideOrigin
        startFillColor={colors.goldenRod}
        endFillColor={colors.midnightBlack}
        focusEnabled
        showDataPointOnFocus
        showTextOnFocus
        focusedDataPointColor="transparent"
        onFocus={handleFocus}
      />

      <View style={styles.xAxisLabelsContainer}>
        {xAxisLabels.map((label, index) => (
          <Text
            key={index}
            style={{
              color: xAxisLabelColors[index],
            }}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  xAxisLabelsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10,
  },
  tooltipContainer: {
    borderRadius: 8,
    marginTop: -44,
    marginLeft: -26,
  },
  boxTooltip: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTooltip: {
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    color: colors.goldenRod,
  },
});

export default memo(AreaLineChart);
