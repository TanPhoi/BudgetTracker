import {ArrowDownIcon, CloseIcon} from '@/assets/svg';
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
import {addTransactionService} from '@/services/transactionManagement';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {formatCurrentDateTime} from '@/utils/formatCurrentDateTime';
import {RouteProp} from '@react-navigation/native';
import Tab from '@/commons/tabs/tab';
import {EMPTY_AMOUNT} from '@/constants/message.constant';
import {t} from 'i18next';
import {Transaction} from '@/models/transaction.model';

type AddTransactionProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'AddTransaction'>;
  route: RouteProp<RootStackParamsList, 'AddTransaction'>;
};

const AddTransaction = ({
  navigation,
  route,
}: AddTransactionProps): JSX.Element => {
  const initialTransaction = route.params?.transaction;
  const [transaction, setTransaction] = useState<Transaction>({
    currentTime: '',
    category: 'groceries',
    amount: 0,
    currency: t('currencyCode'),
    paymentMethod: 'physical_cash',
    desc: '',
    type: 'income',
  });

  useEffect(() => {
    if (initialTransaction) {
      setTransaction(initialTransaction);
    }
  }, [initialTransaction]);

  useEffect(() => {
    if (!initialTransaction) {
      setTransaction(prevTransaction => ({
        ...prevTransaction,
        currentTime: formatCurrentDateTime(),
      }));
    }
  }, [initialTransaction]);

  const handleSetAmount = (value: string): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      amount: Number(value),
    }));
  };

  const handleChangeDesc = (newDesc: string): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      desc: newDesc,
    }));
  };

  const handleInsertTemplate = (): void => {
    if (!transaction.amount) {
      return Alert.alert(EMPTY_AMOUNT);
    }

    const newExpense: Transaction = {
      currentTime: transaction.currentTime,
      category: transaction.category,
      amount: transaction.amount,
      currency: transaction.currency,
      paymentMethod: transaction.paymentMethod,
      desc: transaction.desc,
      type: transaction.type,
    };

    addTransactionService(newExpense);
    navigation.goBack();
  };

  const handleOptionCategory = (): void => {
    navigation.navigate('OptionExpense');
  };

  const handleBlack = (): void => {
    navigation.goBack();
  };

  const handleTransactionTypeChange = (value: string): void => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      type: value,
    }));
  };

  const getCurrency = (currency: string): string => {
    switch (currency) {
      case 'usd':
        return '$';
      case 'inr':
        return '₹';
      default:
        return '₫';
    }
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
            {t('payment_method')}
          </Text>
          <ArrowDownIcon width={7} color={colors.goldenRod} />
        </View>
      </View>

      <View style={styles.boxCategory}>
        <Tab onPress={handleTransactionTypeChange} />

        <TouchableOpacity onPress={handleOptionCategory}>
          <LinearGradient
            colors={[colors.goldenRod, colors.crimsonRed]}
            locations={[0.1, 1]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.gradientCategory}>
            <View style={styles.boxGradient}>
              <Text style={typography.Heading12}>{t('category')}</Text>
              <ArrowDownIcon width={8} height={4} color={colors.pureWhite} />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.boxAmount}>
        <Text style={[typography.Heading13]}>
          {transaction.type === 'income' ? '+' : '-'}
        </Text>
        <View style={styles.boxInput}>
          <Text style={[typography.Heading13]}>
            {getCurrency(transaction.currency)}
          </Text>
          <TextInput
            onChangeText={handleSetAmount}
            value={transaction.amount.toString()}
            style={[typography.Heading13]}
            placeholderTextColor={colors.pureWhite}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TextInput
        onChangeText={handleChangeDesc}
        value={transaction.desc}
        placeholder={t('add_description')}
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
              {t('insert_template')}
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
  boxInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddTransaction;
