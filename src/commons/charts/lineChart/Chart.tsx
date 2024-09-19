import {MessagerIcon} from '@/assets/svg';
import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {CustomDataPoint} from './CustomDataPoint';

type ChartProps = {
  data: {value: number; title: string}[];
};

const Chart = ({data}: ChartProps): JSX.Element => {
  const getCustomDataPoints = (
    data: {value: number; title: string}[],
  ): CustomDataPoint[] => {
    return data.map((point, idx) => {
      return {
        ...point,
        customDataPoint:
          idx === data.length - 1
            ? () => (
                <View style={styles.customChart}>
                  <MessagerIcon
                    width={70}
                    height={40}
                    color={colors.goldenRod}
                  />
                  <Text style={[typography.Heading10, styles.txtCustom]}>
                    {point.value}%
                  </Text>
                </View>
              )
            : undefined,
      };
    });
  };

  const customChartData = getCustomDataPoints(data);

  return (
    <LineChart
      data={customChartData}
      initialSpacing={0}
      spacing={30}
      interpolateMissingValues
      dataPointsColor="transparent"
      thickness={2}
      yAxisThickness={0}
      xAxisThickness={0}
      hideRules
      curveType={1}
      height={100}
      maxValue={100}
      showVerticalLines
      noOfVerticalLines={12}
      verticalLinesHeight={210}
      verticalLinesColor="transparent"
      color={colors.goldenRod}
      verticalLinesThickness={0.4}
      curved
      hideYAxisText
      yAxisLabelWidth={0}
      yAxisExtraHeight={100}
      trimYAxisAtTop
      isAnimated
      disableScroll
    />
  );
};

const styles = StyleSheet.create({
  customChart: {
    position: 'absolute',
    top: -44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  txtCustom: {
    position: 'absolute',
  },
});

export default memo(Chart);
