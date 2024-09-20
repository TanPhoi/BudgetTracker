import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from '@/commons/buttons/Button';
import {BackIcon} from '@/assets/svg';
import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';
import {getDayWithSuffix} from '@/utils/getDayWithSuffix';
import {getSelectCurrentDateTime} from '@/utils/getSelectCurrentDateTime';
import {spacing} from '@/themes/spacing';
import PercentOption from './PercentOption';
import {t} from 'i18next';
import {percentOptions} from '@/constants/insight.contant';

type BoxEditFinanceProps = {
  currentMonthName: string;
  currentMonthPercent: number;
  totalExpense: number;
  finalTotalIncome: number;
  numberPercent: number;
  setNumberPercent: (value: number) => void;
  handleEdit: () => void;
  setModalType: (type: 'edit' | 'delete' | 'create' | 'chart') => void;
};

const BoxEditFinance = ({
  currentMonthName,
  currentMonthPercent,
  totalExpense,
  finalTotalIncome,
  numberPercent,
  setNumberPercent,
  handleEdit,
  setModalType,
}: BoxEditFinanceProps): JSX.Element => {
  return (
    <View style={styles.planEdit}>
      <View>
        <View style={styles.boxHeader}>
          <TouchableOpacity onPress={(): void => setModalType('chart')}>
            <BackIcon width={16} height={16} />
          </TouchableOpacity>
          <Text style={typography.Heading6}>{t('edit_current_plan')}</Text>
          <View style={styles.virtualView}></View>
        </View>
        <Text style={[typography.Heading3, styles.txt]}>
          {t(`${currentMonthName}`)} {currentMonthPercent}%
        </Text>
      </View>

      <View style={styles.boxCenter}>
        <View style={styles.boxTxt}>
          <Text style={[typography.Heading3, styles.txtColor]}>
            {t('today')} {currentMonthName}{' '}
            {getDayWithSuffix(getSelectCurrentDateTime('day'))}{' '}
            {t('and_you_spent')}
          </Text>
          <Text style={typography.Heading5}>
            {t('currency')}
            {totalExpense}
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

      <PercentOption
        options={percentOptions}
        selectedPercent={numberPercent}
        setSelectedPercent={setNumberPercent}
      />
      <View style={styles.button}>
        <Button label={t('save')} onPress={handleEdit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planEdit: {
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.white_transparent_10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.white_transparent_20,
    rowGap: 15,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  virtualView: {
    width: 16,
    height: 16,
  },
  txt: {
    marginTop: 6,
    alignSelf: 'center',
  },
  boxCenter: {
    marginTop: spacing.sm,
    rowGap: 6,
  },
  boxTxt: {
    alignItems: 'center',
  },
  txtColor: {
    color: colors.pureWhite,
  },
  boxPercents: {
    flexDirection: 'row',
    columnGap: 10,
  },
  boxPercent: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkIndigo,
    borderRadius: 15,
  },
  selectBoxPercent: {
    borderColor: colors.goldenRod,
    borderWidth: 1,
  },
  selectTxtPercent: {
    color: colors.goldenRod,
  },
  button: {
    marginTop: spacing.s,
    alignItems: 'center',
  },
});

export default memo(BoxEditFinance);
