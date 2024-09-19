import {EditPlanIcon, SearchIcon, TrashCanIcon} from '@/assets/svg';
import Chart from '@/commons/charts/lineChart/Chart';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import {getDayWithSuffix} from '@/utils/getDayWithSuffix';
import {getSelectCurrentDateTime} from '@/utils/getSelectCurrentDateTime';
import {t} from 'i18next';
import React, {JSX, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type BoxChartFinanceProps = {
  currentMonthName: string;
  currentMonthPercent: number;
  totalExpense: number;
  finalTotalIncome: number;
  chartData: {value: number; title: string}[];
  onPressEdit: () => void;
  onPressDelete: () => void;
};

const BoxChartFinance = ({
  currentMonthName,
  currentMonthPercent,
  totalExpense,
  finalTotalIncome,
  chartData,
  onPressEdit,
  onPressDelete,
}: BoxChartFinanceProps): JSX.Element => {
  return (
    <View style={styles.chartContainer}>
      <View style={styles.boxTop}>
        <View>
          <Text style={[typography.Heading18, styles.txtColor]}>
            {t('current_plan')}
          </Text>
          <Text style={typography.Heading16}>
            {t(`${currentMonthName}`)} {currentMonthPercent}%
          </Text>
        </View>
        <View style={styles.boxTopLeft}>
          <TouchableOpacity onPress={onPressDelete}>
            <TrashCanIcon width={16} height={16} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SearchIcon width={16} height={16} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressEdit}>
            <EditPlanIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boxBottom}>
        <View style={{marginTop: 40}}>
          <Chart data={chartData} />
        </View>
        <View style={styles.boxTxt}>
          <Text style={[typography.Heading3, styles.txtColor]}>
            {t('today')} {t(`${currentMonthName}`)}{' '}
            {getDayWithSuffix(getSelectCurrentDateTime('day'))}{' '}
            {t('and_you_spent')}
          </Text>
          <Text style={typography.Heading5}>
            {t('currency')}
            {totalExpense}{' '}
          </Text>
        </View>
        <View style={styles.boxTxt}>
          <Text style={[typography.Heading3, styles.txtColor]}>
            {t('you_can_spend')}
          </Text>
          <Text style={[typography.Heading18, styles.txtColor]}>
            {t('currency')}
            {finalTotalIncome - totalExpense}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.lg,
    backgroundColor: colors.white_transparent_10,
    rowGap: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.white_transparent_20,
  },
  boxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxTopLeft: {
    flexDirection: 'row',
    columnGap: 15,
  },
  txtColor: {
    color: colors.pureWhite,
  },
  boxBottom: {
    rowGap: 15,
  },
  boxTxt: {
    alignItems: 'center',
  },
});

export default memo(BoxChartFinance);
