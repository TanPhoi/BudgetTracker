import {monthsOfYear} from '@/constants/insight.contant';
import {ERROR_MISSING_FIELD} from '@/constants/message.constant';
import {totalTransactionOverTime} from '@/helpers/transaction.helper';
import {Transaction} from '@/models/transaction.model';
import {
  addFinancialFixedService,
  deleteFinancialFixedService,
  editFinancialFixedService,
  getFinancialFixedsService,
} from '@/services/financialFixed';
import {getTransactionsService} from '@/services/transactionManagement';
import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';
import {getSelectCurrentDateTime} from '@/utils/getSelectCurrentDateTime';
import {getStartAndEndOfCurrentMonth} from '@/utils/getStartAndEndOfCurrentMonth';
import {parseDateString} from '@/utils/parseDateString';
import React, {
  JSX,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {getCurrentDate} from '@/utils/getCurrentDate';
import {formatDateRange} from '@/utils/formatDateRange';
import {getDateRangeLastDayMonth} from '@/utils/getDateRangeLastDayMonth';
import {useFocusEffect} from '@react-navigation/native';
import BoxAddFinance from './BoxAddFinance';
import BoxChartFinance from './BoxChartFinance';
import BoxDeleteFinance from './BoxDeleteFinance';
import BoxEditFinance from './BoxEditFinance';
import {spacing} from '@/themes/spacing';
import {FinancialFixed} from '@/models/financialFixed.model';
import {t} from 'i18next';

const SavingsPlan = (): JSX.Element => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [financialFixeds, setFinancialFixeds] = useState<FinancialFixed[]>([]);
  const [currentMonthName, setCurrentMonthName] = useState<string>('');
  const [currentFixedIncome, setCurrentFixedIncome] = useState<number>(0);
  const [currentFixedCosts, setCurrentFixedCosts] = useState<number>(0);
  const [numberPercent, setNumberPercent] = useState<number>(0);
  const [idFinancialFixeds, setIdFinancialFixeds] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    'edit' | 'delete' | 'create' | 'chart'
  >('create');

  useFocusEffect(
    useCallback(() => {
      const fetchTransactions = (): void => {
        getTransactionsService<Transaction[]>().then(transactions => {
          if (transactions) {
            setTransactions(transactions);

            const {start, end} = getStartAndEndOfCurrentMonth();
            const incomeResult = totalTransactionOverTime(
              transactions,
              'income',
              start,
              end,
            );
            const expenseResult = totalTransactionOverTime(
              transactions,
              'expense',
              start,
              end,
            );
            setTotalIncome(incomeResult.totalTransaction);
            setTotalExpense(expenseResult.totalTransaction);
          }
        });
      };

      const getFinancialFixeds = (): void => {
        getFinancialFixedsService<FinancialFixed>().then(financialFixeds => {
          if (financialFixeds) {
            setFinancialFixeds(financialFixeds);

            const currentDate = new Date();
            const {start, end} = getStartAndEndOfCurrentMonth();
            const filteredFinancialFixeds = financialFixeds.filter(item => {
              const itemDate = new Date(item.time);
              return itemDate >= start && itemDate <= end;
            });

            if (filteredFinancialFixeds.length >= 1) {
              setCurrentFixedIncome(filteredFinancialFixeds[0].fixedIncome);
              setCurrentFixedCosts(filteredFinancialFixeds[0].fixedCosts);
              setNumberPercent(filteredFinancialFixeds[0].percent);
              setIdFinancialFixeds(filteredFinancialFixeds[0].key || '');
              const itemDate = new Date(filteredFinancialFixeds[0].time);
              const month = itemDate.getMonth() + 1;
              if (getSelectCurrentDateTime('month') === month) {
                setModalType('chart');
              }
            } else {
              setCurrentFixedIncome(0);
              setCurrentFixedCosts(0);
              setNumberPercent(0);
              setIdFinancialFixeds('');
            }

            setCurrentMonthName(monthsOfYear[currentDate.getMonth()]);
          }
        });
      };

      getFinancialFixeds();
      fetchTransactions();

      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 2000);

      return () => clearTimeout(timer);
    }, []),
  );

  const finalTotalIncome = useMemo((): number => {
    return totalIncome + currentFixedIncome - currentFixedCosts;
  }, [totalIncome, currentFixedIncome, currentFixedCosts]);

  const handleSave = (
    fixedIncome: number,
    fixedCosts: number,
    numberPercent: number,
  ): void => {
    const currentDate = new Date();
    if (!numberPercent || !fixedCosts || !fixedIncome) {
      return Alert.alert(ERROR_MISSING_FIELD);
    }

    const newFinancialFixed: FinancialFixed = {
      id: Math.random(),
      fixedIncome,
      fixedCosts,
      percent: numberPercent,
      time: getCurrentDate(),
    };

    addFinancialFixedService(newFinancialFixed).then(newId => {
      setFinancialFixeds(prev => [...prev, {...newFinancialFixed, key: newId}]);
      setCurrentFixedIncome(fixedIncome);
      setCurrentFixedCosts(fixedCosts);
      setIdFinancialFixeds(newId);
      setNumberPercent(numberPercent);
      setCurrentMonthName(monthsOfYear[currentDate.getMonth()]);
    });
    setModalType('chart');
  };

  const calculatePercentageRemaining = useCallback(
    (total: number, spent: number): number => {
      const remainingBalance = total - spent;
      return Math.round((remainingBalance / total) * 100);
    },
    [],
  );

  const getChartData = (
    data: Transaction[],
  ): {value: number; title: string}[] => {
    const {start, end} = getStartAndEndOfCurrentMonth();
    const totals = data
      .filter(item => item.type === 'expense')
      .reduce<{[key: string]: number}>((acc, item) => {
        const time = parseDateString(item.currentTime);
        if (time >= start && time <= end) {
          const date = time.toISOString().split('T')[0];
          acc[date] = (acc[date] || 0) + item.amount;
        }
        return acc;
      }, {});

    if (Object.keys(totals).length === 0) return [{value: 0, title: ''}];

    let totalSpent = 0;
    const chartData = Object.keys(totals)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map(date => {
        totalSpent += totals[date] || 0;
        const percentage =
          totalIncome > 0
            ? calculatePercentageRemaining(finalTotalIncome, totalSpent)
            : 0;
        return {title: date, value: percentage};
      });

    return [{title: '', value: 100}, ...chartData];
  };

  const handleDelete = useCallback(
    (isConfirmed: 'yes' | 'no'): void => {
      if (isConfirmed === 'yes') {
        if (idFinancialFixeds) {
          const financialFixedId = idFinancialFixeds.toString();
          deleteFinancialFixedService(financialFixedId);

          setFinancialFixeds(prev =>
            prev.filter(item => item.key !== financialFixedId),
          );
          setModalType('create');
        }
      } else {
        setModalType('chart');
      }
    },
    [idFinancialFixeds, setFinancialFixeds],
  );

  const handleEdit = useCallback((): void => {
    if (idFinancialFixeds && numberPercent) {
      editFinancialFixedService(idFinancialFixeds, {
        percent: numberPercent,
      }).then(() => {
        const updatedFinancialFixeds = financialFixeds.map(item =>
          item.key === idFinancialFixeds
            ? {...item, percent: numberPercent}
            : item,
        );
        setFinancialFixeds(updatedFinancialFixeds);
        setNumberPercent(prev =>
          prev !== numberPercent ? numberPercent : prev,
        );
      });

      setModalType('chart');
    }
  }, [idFinancialFixeds, numberPercent]);

  const chartData = getChartData(transactions || []);

  const RenderItem = ({item}: {item: FinancialFixed}) => {
    const {start, end} = getDateRangeLastDayMonth(item.time);
    const formattedDateRange = formatDateRange(start, end);

    return (
      <View style={styles.boxItem}>
        <View style={styles.boxLeft}>
          <View style={styles.box}></View>
          <View>
            <Text style={typography.Heading6}>
              {t('plan')} {item.percent}%
            </Text>
            <Text style={typography.Heading7}>{formattedDateRange}</Text>
          </View>
        </View>

        <View style={styles.boxRight}>
          <Text style={typography.Heading23}>
            {t('currency')}
            {item.fixedCosts}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {modalType === 'create' && <BoxAddFinance onSave={handleSave} />}

          {modalType === 'edit' && (
            <BoxEditFinance
              currentMonthName={currentMonthName}
              currentMonthPercent={numberPercent}
              totalExpense={totalExpense}
              finalTotalIncome={finalTotalIncome}
              numberPercent={numberPercent}
              setNumberPercent={setNumberPercent}
              handleEdit={handleEdit}
              setModalType={setModalType}
            />
          )}

          {modalType === 'delete' && (
            <BoxDeleteFinance
              handleDelete={handleDelete}
              setModalType={setModalType}
              currentMonthName={currentMonthName}
              currentMonthPercent={numberPercent}
            />
          )}

          {modalType === 'chart' && (
            <BoxChartFinance
              currentMonthName={currentMonthName}
              currentMonthPercent={numberPercent}
              totalExpense={totalExpense}
              finalTotalIncome={finalTotalIncome}
              chartData={chartData}
              onPressEdit={(): void => setModalType('edit')}
              onPressDelete={(): void => setModalType('delete')}
            />
          )}

          <View style={styles.flatList}>
            <FlatList
              data={financialFixeds}
              renderItem={({item}) => <RenderItem item={item} />}
              contentContainerStyle={styles.flatStyle}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  flatStyle: {
    rowGap: spacing.md,
  },
  boxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.white_transparent_20,
    borderRadius: 50,
    padding: spacing.s,
  },
  boxLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.aquaBlue,
  },
  boxRight: {
    borderRadius: 20,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.white_transparent_20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: colors.pureWhite,
  },
});

export default memo(SavingsPlan);
