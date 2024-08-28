import {CloseIcon} from '@/assets/svg';
import {colors} from '@/themes/colors';
import React, {JSX, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FormField from '@/commons/inputs/FormField';
import {ExpenseType} from '@/models/expenseType.model';
import {formatCurrentDateTime} from '@/utils/formatCurrentDateTime';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {spacing} from '@/themes/spacing';
import Tab from '@/commons/tabs/tab';
import {REGEX} from '@/constants/regexs.constant';
import SelectOption from '@/commons/selectOptions/SelectOption';
import {DropdownOptionType} from '@/commons/dropdown/dropdownOptionType';
import {CATEGORIES} from '@/constants/categories.contant';
import {CURRENCIES} from '@/constants/currencies.contant';
import {PAYMENT_METHOD} from '@/constants/payment_method.contant';
import {t} from 'i18next';

type OptionExpenseProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'OptionExpense'>;
};

const OptionExpense = ({navigation}: OptionExpenseProps): JSX.Element => {
  const [expense, setExpense] = useState<ExpenseType>({
    currentTime: '',
    category: 'groceries',
    amount: 0,
    currency: 'usd',
    paymentMethod: 'physical_cash',
    desc: '',
    type: 'income',
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setExpense(prevExpense => ({
      ...prevExpense,
      currentTime: formatCurrentDateTime(),
    }));
  }, []);

  const handleChangeCategory = useCallback(
    (item: DropdownOptionType, isOpen: boolean): void => {
      setExpense(prevExpense => ({
        ...prevExpense,
        category: item.option,
      }));
      setOpenDropdown(isOpen ? 'category' : null);
    },
    [],
  );

  const handleChangeCurrency = useCallback(
    (item: DropdownOptionType, isOpen: boolean): void => {
      setExpense(prevExpense => ({
        ...prevExpense,
        currency: item.option,
      }));
      setOpenDropdown(isOpen ? 'currency' : null);
    },
    [],
  );

  const handleChangePaymentMethod = useCallback(
    (item: DropdownOptionType, isOpen: boolean): void => {
      setExpense(prevExpense => ({
        ...prevExpense,
        paymentMethod: item.option,
      }));
      setOpenDropdown(isOpen ? 'paymentMethod' : null);
    },
    [],
  );

  const handleChangeAmount = (newAmount: string): void => {
    const cleanedValue = newAmount.replace(REGEX.ONLY_NUMBERS_AND_DOTS, '');

    const numericValue = parseFloat(cleanedValue);

    setExpense(prevExpense => ({
      ...prevExpense,
      amount: isNaN(numericValue) ? 0 : numericValue,
    }));
  };

  const handleChangeDesc = (newDesc: string): void => {
    setExpense(prevExpense => ({
      ...prevExpense,
      desc: newDesc,
    }));
  };

  const handleBack = (): void => {
    navigation.navigate('AddExpense', {
      expense,
    });
  };

  const handleTransactionTypeChange = (value: string) => {
    setExpense(prev => ({
      ...prev,
      type: value,
    }));
  };

  const handleToggleDropdown = (dropdownType: string) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
  };

  return (
    <LinearGradient
      colors={[colors.midnightBlack, colors.semiTransparentRed]}
      locations={[0.9, 1]}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      style={{flex: 1}}>
      <TouchableOpacity style={styles.iconBack} onPress={handleBack}>
        <CloseIcon width={16} height={16} />
      </TouchableOpacity>
      <Tab onPress={handleTransactionTypeChange} />
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <View style={{rowGap: 16, marginTop: 30}}>
          <FormField
            label={t('transaction_print')}
            value={expense.currentTime}
            isEditable={false}
          />

          <SelectOption
            data={CATEGORIES}
            onSelect={handleChangeCategory}
            label={t('category_print')}
            isOpen={openDropdown === 'category'}
            defaultSelected={expense.category}
            onToggle={() => handleToggleDropdown('category')}
          />

          <FormField
            label={t('amount')}
            value={`${
              expense.currency === 'usd'
                ? '$'
                : expense.currency === 'vnd'
                ? '₫'
                : '₹'
            }${expense.amount}`}
            onChange={handleChangeAmount}
            keyboardType="numeric"
          />

          <SelectOption
            data={CURRENCIES}
            onSelect={handleChangeCurrency}
            isOpen={openDropdown === 'currency'}
            label={t('currency_print')}
            defaultSelected={expense.currency}
            onToggle={() => handleToggleDropdown('currency')}
          />

          <SelectOption
            data={PAYMENT_METHOD}
            onSelect={handleChangePaymentMethod}
            isOpen={openDropdown === 'paymentMethod'}
            label={t('payment_method_print')}
            defaultSelected={expense.paymentMethod}
            onToggle={() => handleToggleDropdown('paymentMethod')}
          />

          <FormField
            label={t('desc_print')}
            value={expense.desc}
            onChange={handleChangeDesc}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.md,
  },
  iconBack: {
    marginTop: spacing.xl,
    marginLeft: spacing.md,
  },
});

export default OptionExpense;
