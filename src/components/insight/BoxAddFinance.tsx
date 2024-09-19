import {AddIcon} from '@/assets/svg';
import Button from '@/commons/buttons/Button';
import InputCard from '@/commons/inputs/InputCard';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PercentOption from './PercentOption';
import {t} from 'i18next';
import {percentOptions} from '@/constants/insight.contant';

type BoxAddFinanceProps = {
  onSave: (
    fixedIncome: number,
    fixedCosts: number,
    numberPercent: number,
  ) => void;
};

const BoxAddFinance = ({onSave}: BoxAddFinanceProps): JSX.Element => {
  const [fixedIncome, setFixedIncome] = useState<number | null>(null);
  const [fixedCosts, setFixedCosts] = useState<number | null>(null);
  const [numberPercent, setNumberPercent] = useState<number | null>(null);

  const handleSave = () => {
    if (fixedIncome !== null && fixedCosts !== null && numberPercent !== null) {
      onSave(fixedIncome, fixedCosts, numberPercent);
    }
  };

  return (
    <View style={styles.planContainer}>
      <View>
        <View style={styles.boxTxtPlan}>
          <AddIcon width={13} height={13} color={colors.goldenRod} />
          <Text style={typography.Heading18}>{t('new_plan')}</Text>
        </View>
        <Text style={[typography.Heading3, styles.txtAdd]}>
          {t('enter_parameters')}
        </Text>
      </View>

      <View style={styles.boxInput}>
        <InputCard
          placeHolder={t('fixed_income')}
          onChange={(value): void => setFixedIncome(Number(value))}
          keyboardType={'numeric'}
        />

        <InputCard
          placeHolder={t('fixed_costs')}
          onChange={(value): void => setFixedCosts(Number(value))}
          keyboardType={'numeric'}
        />

        <PercentOption
          options={percentOptions}
          selectedPercent={numberPercent}
          setSelectedPercent={setNumberPercent}
        />

        <View style={styles.button}>
          <Button label={t('save')} onPress={handleSave} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planContainer: {
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
  boxTxtPlan: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  txtAdd: {
    color: colors.pureWhite,
    marginLeft: spacing.md,
  },
  boxInput: {
    rowGap: 20,
  },
  boxPercents: {
    flexDirection: 'row',
    columnGap: spacing.sm,
  },
  boxPercent: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkIndigo,
    borderRadius: 15,
  },
  button: {
    marginTop: spacing.s,
    alignItems: 'center',
  },
  selectBoxPercent: {
    borderColor: colors.goldenRod,
    borderWidth: 1,
  },
  selectTxtPercent: {
    color: colors.goldenRod,
  },
});

export default BoxAddFinance;
