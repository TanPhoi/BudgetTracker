import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@/themes/colors';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {typography} from '@/themes/typography';
import {spacing} from '@/themes/spacing';
import {getExpenseService} from '@/services/expenseManagement';
import {ExpenseType} from '@/models/expenseType.model';
import {AddIcon, MenuIcon} from '@/assets/svg';
import CustomPieChart from '@/components/home/PieChart';

const pieChartData = [
  {
    categories: ['Investments', 'Electronics'],
    startColor: colors.royalPurple,
    stopColor: colors.lavenderMist,
  },
  {
    categories: ['Groceries', 'Life'],
    startColor: colors.blueLagoon,
    stopColor: colors.aquaBlue,
  },
  {
    categories: ['Apparels', 'Transportation'],
    startColor: colors.goldenRod,
    stopColor: colors.crimsonRed,
  },
];

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};

const Home = ({navigation}: HomeProps): JSX.Element => {
  const [expenses, setExpenses] = useState<ExpenseType[] | null>(null);
  const [currentAmount, setCurrentAmount] = useState<string>('1,05,284');

  useFocusEffect(
    useCallback(() => {
      const fetchExpenses = () => {
        getExpenseService<ExpenseType[]>().then(data => {
          setExpenses(data || []);
        });
      };
      fetchExpenses();
    }, []),
  );

  const parseAmount = (amount: string): number => {
    return parseFloat(amount.replace(/[^\d.-]/g, ''));
  };

  const calculateTotalCategoryExpenses = (
    expenses: ExpenseType[],
    categories: string[],
  ): number => {
    return expenses
      .filter(expense => categories.includes(expense.category))
      .reduce((total, expense) => {
        return total + parseAmount(expense.amount);
      }, 0);
  };

  const calculatePercentage = (amount: number, total: number): number => {
    return total > 0 ? Math.min((amount / total) * 100, 100) : 0;
  };

  const totalAmount = parseAmount(currentAmount);

  const getCategoryColors = (category: string): string[] => {
    switch (category) {
      case 'Investments':
      case 'Electronics':
        return [colors.royalPurple, colors.lavenderMist];
      case 'Groceries':
      case 'Life':
        return [colors.blueLagoon, colors.aquaBlue];
      default:
        return [colors.goldenRod, colors.crimsonRed];
    }
  };

  const handleMenu = (): void => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleAddExpense = (): void => {
    navigation.navigate('AddExpense');
  };

  const RenderItem = (item: ExpenseType) => {
    const [startColor, endColor] = getCategoryColors(item.category);
    return (
      <View style={styles.boxContainer}>
        <LinearGradient
          colors={[startColor, endColor]}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradientBorder}
        />
        <View style={styles.boxItem}>
          <View style={styles.boxLeft}>
            <View style={styles.box}></View>
            <View>
              <Text style={typography.Heading6}>{item.category}</Text>
              <Text style={typography.Heading7}>{item.currentTime}</Text>
            </View>
          </View>
          <Text style={styles.txtAmountItem}>-{item.amount}</Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[colors.midnightBlack, colors.semiTransparentRed]}
      locations={[0.9, 1]}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleMenu}>
            <MenuIcon />
          </TouchableOpacity>
          <Text style={typography.Heading1}>Welcome</Text>
          <View style={styles.placeholder}></View>
        </View>

        <Text style={[styles.txtAvailableBalance, typography.Heading3]}>
          Available Balance
        </Text>
        <Text style={[styles.txtAmount, typography.Heading4]}>
          ₹{currentAmount}
        </Text>

        <View style={styles.boxCenter}>
          <View style={styles.progressContainer}>
            {pieChartData.map((data, index) => {
              const totalCategoryExpenses = calculateTotalCategoryExpenses(
                expenses || [],
                data.categories,
              );
              return (
                <View key={index} style={styles.progressWrapper}>
                  <CustomPieChart
                    size={90}
                    strokeWidth={15}
                    progress={calculatePercentage(
                      totalCategoryExpenses,
                      totalAmount,
                    )}
                    startColor={data.startColor}
                    stopColor={data.stopColor}
                  />
                </View>
              );
            })}
          </View>

          <Text style={styles.txtMyTransactions}>My transactions</Text>

          <FlatList
            data={expenses}
            renderItem={({item}) => <RenderItem {...item} />}
            contentContainerStyle={styles.flatContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <TouchableOpacity onPress={handleAddExpense}>
          <LinearGradient
            colors={[colors.goldenRod, colors.crimsonRed]}
            locations={[0.1, 1]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.button}>
            <AddIcon width={17} height={29} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
  txtAvailableBalance: {
    marginTop: spacing.xl,
    textAlign: 'center',
  },
  txtAmount: {
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: -50,
    right: 20,
    left: 20,
  },
  progressWrapper: {
    width: 110,
    height: 110,
    backgroundColor: colors.midnightBlack,
    borderRadius: 110 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtMyTransactions: {
    marginTop: spacing.xxl,
    color: colors.pureWhite,
    fontFamily: 'DMSans-Medium',
    letterSpacing: 0.24,
    fontSize: 16,
    fontWeight: '500',
  },

  flatContainer: {
    marginTop: spacing.xs,
  },
  boxContainer: {
    marginTop: spacing.xs,
  },
  gradientBorder: {
    position: 'absolute',
    width: 10,
    height: '100%',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  boxItem: {
    backgroundColor: colors.midnightBlack,
    borderRadius: 20,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  boxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: colors.goldenRod,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtAmountItem: {
    color: colors.pureWhite,
    fontFamily: 'DMSans-Medium',
    fontSize: 13,
    letterSpacing: 0.2,
    marginRight: spacing.md,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 8,
    right: 32,
  },
  boxCenter: {
    paddingHorizontal: spacing.md,
    flex: 1,
    backgroundColor: colors.midnightBlue,
    marginTop: spacing.xxx,
  },
});

export default Home;
