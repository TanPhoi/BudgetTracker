import {ArrowDownIcon, CloseIcon} from '@/assets/svg';
import IncomeExpenseButton from '@/commons/buttons/IncomeExpenseButton';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import React, {JSX, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {setExpenseService} from '@/services/expenseManagement';
import {ExpenseType} from '@/models/expenseType.model';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {formatCurrentDateTime} from '@/utils/formatCurrentDateTime';
import {RouteProp} from '@react-navigation/native';

type AddExpenseProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'AddExpense'>;
  route: RouteProp<RootStackParamsList, 'AddExpense'>;
};

const AddExpense = ({navigation, route}: AddExpenseProps): JSX.Element => {
  const initialExpense = route.params?.expense;

  const [expense, setExpense] = useState<ExpenseType>({
    currentTime: '',
    category: 'Groceries',
    amount: '',
    currency: 'INR (₹)',
    paymentMethod: 'Physical Cash',
    desc: '',
  });

  useEffect(() => {
    if (initialExpense) {
      setExpense(initialExpense);
    }
  }, [initialExpense]);

  useEffect(() => {
    if (!route.params?.expense) {
      setExpense(prevExpense => ({
        ...prevExpense,
        currentTime: formatCurrentDateTime(),
      }));
    }
  }, [route.params?.expense]);

  const handleSetAmount = (value: string): void => {
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    setExpense(prevExpense => ({
      ...prevExpense,
      amount: `₹${cleanedValue}`,
    }));
  };

  const handleChangeDesc = (newDesc: string): void => {
    setExpense(prevExpense => ({
      ...prevExpense,
      desc: newDesc,
    }));
  };

  const handleInsertTemplate = (): void => {
    if (!expense.amount) {
      return Alert.alert('Amount cannot be empty!');
    }

    const newExpense: ExpenseType = {
      currentTime: expense.currentTime,
      category: expense.category,
      amount: expense.amount,
      currency: expense.currency,
      paymentMethod: expense.paymentMethod,
      desc: expense.desc,
    };

    setExpenseService(newExpense);
    navigation.goBack();
  };

  const handleOptionCategory = (): void => {
    navigation.navigate('OptionExpense');
  };

  const handleBlack = (): void => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={[colors.midnightBlack, colors.semiTransparentRed]}
      locations={[0.9, 1]}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBlack}>
          <CloseIcon />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Text style={[styles.txtPaymentMethod, typography.Heading3]}>
            Payment Method
          </Text>
          <ArrowDownIcon width={7} color={colors.goldenRod} />
        </View>
      </View>

      <View style={styles.boxCategory}>
        <IncomeExpenseButton />

        <TouchableOpacity onPress={handleOptionCategory}>
          <LinearGradient
            colors={[colors.goldenRod, colors.crimsonRed]}
            locations={[0.1, 1]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.gradientCategory}>
            <View style={styles.boxGradient}>
              <Text style={typography.Heading12}>Category</Text>
              <ArrowDownIcon width={8} height={4} color={colors.pureWhite} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.boxAmount}>
        <Text style={[typography.Heading13]}>-</Text>
        <TextInput
          onChangeText={handleSetAmount}
          value={expense.amount}
          style={[typography.Heading13]}
          placeholder="₹ 0"
          placeholderTextColor={colors.pureWhite}
          keyboardType="numeric"
        />
      </View>

      <TextInput
        onChangeText={handleChangeDesc}
        value={expense.desc}
        placeholder="Add Description"
        placeholderTextColor={colors.transparentWhite}
        style={[styles.edtAddDescription, typography.Heading3]}
        selectionColor={colors.goldenRod}
      />

      <TouchableOpacity style={styles.button} onPress={handleInsertTemplate}>
        <LinearGradient
          colors={[colors.goldenRod, colors.crimsonRed]}
          locations={[0.4, 0.6]}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}>
          <View style={styles.btnInsert}>
            <Text style={[typography.Heading3, styles.txtInsert]}>
              Insert Template
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  txtPaymentMethod: {
    fontWeight: '500',
  },
  boxAmount: {
    marginTop: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  edtAddDescription: {
    marginTop: spacing.lg,
    marginHorizontal: 20,
    height: 30,
    paddingVertical: spacing.xxs,
    borderBottomWidth: 1,
    borderColor: colors.goldenRod,
  },

  button: {
    marginTop: spacing.lg,
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
  },
  txtInsert: {
    color: colors.pureWhite,
  },
  btnInsert: {
    paddingVertical: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    marginTop: spacing.lg,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xsl,
  },
  boxNumber: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientCategory: {
    width: 138,
    height: 41,
    backgroundColor: 'red',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    bottom: 15,
  },
  boxGradient: {
    marginTop: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 4,
  },
  boxCategory: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddExpense;
