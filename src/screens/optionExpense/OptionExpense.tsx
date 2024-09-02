import {CloseIcon} from '@/assets/svg';
import {colors} from '@/themes/colors';
import React, {JSX, useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {formatCurrentDateTime} from '@/utils/formatCurrentDateTime';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {spacing} from '@/themes/spacing';
import Tab from '@/commons/tabs/tab';
import SelectOption from '@/commons/selects/SelectOption';
import {DropdownOptionType} from '@/commons/dropdown/dropdownOptionType';
import {CATEGORIES} from '@/constants/categories.contant';
import {CURRENCIES} from '@/constants/currencies.contant';
import {t} from 'i18next';
import InputMain from '@/commons/inputs/InputMain';
import {PAYMENT_METHOD} from '@/constants/paymentMethod.contant';
import {Transaction} from '@/models/transaction.model';

type OptionExpenseProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'OptionExpense'>;
};

const OptionExpense = ({navigation}: OptionExpenseProps): JSX.Element => {
  const [transaction, setTransaction] = useState<Transaction>({
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
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      currentTime: formatCurrentDateTime(),
    }));
  }, []);

  const handleChangeCategory = useCallback(
    (item: DropdownOptionType, isOpen: boolean): void => {
      setTransaction(prevTransaction => ({
        ...prevTransaction,
        category: item.option,
      }));
      setOpenDropdown(isOpen ? 'category' : null);
    },
    [],
  );

  const handleChangeCurrency = useCallback(
    (item: DropdownOptionType, isOpen: boolean): void => {
      setTransaction(prevTransaction => ({
        ...prevTransaction,
        currency: item.option,
      }));
      setOpenDropdown(isOpen ? 'currency' : null);
    },
    [],
  );

  const handleChangePaymentMethod = useCallback(
    (item: DropdownOptionType, isOpen: boolean): void => {
      setTransaction(prevTransaction => ({
        ...prevTransaction,
        paymentMethod: item.option,
      }));
      setOpenDropdown(isOpen ? 'paymentMethod' : null);
    },
    [],
  );

  const handleChangeAmount = (newAmount: string): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      amount: Number(newAmount),
    }));
  };

  const handleChangeDesc = (newDesc: string): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      desc: newDesc,
    }));
  };

  const handleBack = (): void => {
    navigation.navigate('AddTransaction', {
      transaction,
    });
  };

  const handleTransactionTypeChange = (value: string) => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      type: value,
    }));
  };

  const handleToggleDropdown = (dropdownType: string) => {
    setOpenDropdown(openDropdown === dropdownType ? null : dropdownType);
  };

  const getCurrency = (currency: string): string => {
    switch (currency) {
      case 'usd':
        return '$';
      case 'vnd':
        return '₫';
      default:
        return '₹';
    }
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
          <InputMain
            label={t('transaction_print')}
            value={transaction.currentTime}
            editable={false}
          />

          <SelectOption
            data={CATEGORIES}
            onSelect={handleChangeCategory}
            label={t('category_print')}
            isOpen={openDropdown === 'category'}
            defaultSelected={transaction.category}
            onToggle={() => handleToggleDropdown('category')}
          />

          <InputMain
            label={t('amount')}
            value={transaction.amount.toString()}
            onChange={handleChangeAmount}
            keyboardType="numeric"
            prefix={getCurrency(transaction.currency)}
          />

          <SelectOption
            data={CURRENCIES}
            onSelect={handleChangeCurrency}
            isOpen={openDropdown === 'currency'}
            label={t('currency_print')}
            defaultSelected={transaction.currency}
            onToggle={() => handleToggleDropdown('currency')}
          />

          <SelectOption
            data={PAYMENT_METHOD}
            onSelect={handleChangePaymentMethod}
            isOpen={openDropdown === 'paymentMethod'}
            label={t('payment_method_print')}
            defaultSelected={transaction.paymentMethod}
            onToggle={() => handleToggleDropdown('paymentMethod')}
          />

          <InputMain
            label={t('desc_print')}
            value={transaction.desc}
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
