import {
  AddPriceIcon,
  AddToCartIcon,
  BusFrontIcon,
  CloseIcon,
  Monitor,
  TshirtIcon,
  UserGroupsIcon,
} from '@/assets/svg';
import IncomeExpenseButton from '@/commons/buttons/IncomeExpenseButton';
import {colors} from '@/themes/colors';
import React, {JSX, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FormField from '@/components/optionExpense/FormField';
import {ExpenseType} from '@/models/expenseType.model';
import {formatCurrentDateTime} from '@/utils/formatCurrentDateTime';
import SelectableDropdown from '@/commons/dropdown/SelectableDropdown';
import {DropdownOptionType} from '@/models/dropdownOptionType.model';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {spacing} from '@/themes/spacing';

const optionCategory = [
  {key: 1, option: 'Apparels', icon: <TshirtIcon />, color: '#A858EE'},
  {key: 2, option: 'Electronics', icon: <Monitor />, color: '#E3B53C'},
  {key: 3, option: 'Groceries', icon: <AddToCartIcon />, color: '#61D8D8'},
  {key: 4, option: 'Investments', icon: <AddPriceIcon />, color: '#FFE870'},
  {key: 5, option: 'Life', icon: <UserGroupsIcon />, color: '#8EFDAD'},
  {key: 6, option: 'Transportation', icon: <BusFrontIcon />, color: '#E33C3C'},
];

const optionCurrency = [
  {key: 1, option: 'INR (₹)'},
  {key: 2, option: 'USD ($)'},
  {key: 3, option: 'VND (₫)'},
];

const optionPaymentMethod = [
  {key: 1, option: 'Physical Cash'},
  {key: 2, option: 'Card Payment'},
];

type OptionExpenseProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'OptionExpense'>;
};

const OptionExpense = ({navigation}: OptionExpenseProps): JSX.Element => {
  const [expense, setExpense] = useState<ExpenseType>({
    currentTime: '',
    category: 'Groceries',
    amount: '',
    currency: 'INR (₹)',
    paymentMethod: 'Physical Cash',
    desc: '',
  });
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setExpense(prevExpense => ({
      ...prevExpense,
      currentTime: formatCurrentDateTime(),
    }));
  }, []);

  const handleChangeCategory = (item: DropdownOptionType): void => {
    setExpense(prevExpense => ({
      ...prevExpense,
      category: item.option,
    }));
  };

  const handleChangeCurrency = (item: DropdownOptionType): void => {
    let currencySymbol = '₹';

    if (item.option.includes('USD')) {
      currencySymbol = '$';
    } else if (item.option.includes('VND')) {
      currencySymbol = '₫';
    }

    setExpense(prevExpense => ({
      ...prevExpense,
      currency: item.option,
      amount: `${currencySymbol}${prevExpense.amount.replace(/[^0-9]/g, '')}`,
    }));
  };

  const handleChangePaymentMethod = (item: DropdownOptionType): void => {
    setExpense(prevExpense => ({
      ...prevExpense,
      paymentMethod: item.option,
    }));
  };

  const handleChangeAmount = (newAmount: string): void => {
    const numericValue = newAmount.replace(/[^0-9]/g, '');
    let currencySymbol = '₹';

    if (expense.currency.includes('USD')) {
      currencySymbol = '$';
    } else if (expense.currency.includes('VND')) {
      currencySymbol = '₫';
    }

    setExpense(prevExpense => ({
      ...prevExpense,
      amount: `${currencySymbol}${numericValue}`,
    }));
  };

  const handleChangeDesc = (newDesc: string): void => {
    setExpense(prevExpense => ({
      ...prevExpense,
      desc: newDesc,
    }));
  };

  const handleToggleDropdown = (index: number): void => {
    setOpenDropdownIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleBack = (): void => {
    navigation.navigate('AddExpense', {
      expense,
    });
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
      <IncomeExpenseButton />
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <View style={{rowGap: 16, marginTop: 30}}>
          <FormField
            label={'TRANSACTION'}
            value={expense.currentTime}
            editable={false}
          />

          <SelectableDropdown
            data={optionCategory}
            onSelect={handleChangeCategory}
            label={'CATEGORY'}
            defaultSelected={expense.category}
            isOpen={openDropdownIndex === 0}
            onToggle={() => handleToggleDropdown(0)}
          />

          <FormField
            label={'AMOUNT'}
            value={expense.amount}
            onChange={handleChangeAmount}
            keyboardType="numeric"
          />

          <SelectableDropdown
            data={optionCurrency}
            onSelect={handleChangeCurrency}
            label={'CURRENCY'}
            defaultSelected={expense.currency}
            isOpen={openDropdownIndex === 1}
            onToggle={() => handleToggleDropdown(1)}
          />

          <SelectableDropdown
            data={optionPaymentMethod}
            onSelect={handleChangePaymentMethod}
            label={'PAYMENT METHOD'}
            defaultSelected={expense.paymentMethod}
            isOpen={openDropdownIndex === 2}
            onToggle={() => handleToggleDropdown(2)}
          />

          <FormField
            label={'DESCRIPTION'}
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
