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
import React, {JSX, memo, useCallback, useEffect, useState} from 'react';
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
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [finalTotalIncome, setFinalTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [financialFixeds, setFinancialFixeds] = useState<FinancialFixed[]>([]);
  const [currentMonthPercent, setCurrentMonthPercent] = useState<number>(0);
  const [currentMonthName, setCurrentMonthName] = useState<string>('');
  const [currentFixedIncome, setCurrentFixedIncome] = useState<number>(0);
  const [currentFixedCosts, setCurrentFixedCosts] = useState<number>(0);
  const [numberPercent, setNumberPercent] = useState<number | null>(null);
  const [idFinancialFixeds, setIdFinancialFixeds] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [showBox, setShowBox] = useState<boolean>(false);
  const [showBoxEdit, setShowBoxEdit] = useState<boolean>(false);
  const [showBoxDelete, setShowBoxDelete] = useState<boolean>(false);

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

      const getFinancialFixeds = () => {
        getFinancialFixedsService<FinancialFixed>().then(financialFixeds => {
          if (financialFixeds) {
            setFinancialFixeds(financialFixeds);

            const currentDate = new Date();
            const {start, end} = getStartAndEndOfCurrentMonth();
            const filteredFinancialFixeds = financialFixeds.filter(item => {
              const itemDate = new Date(item.time);
              return itemDate >= start && itemDate <= end;
            });

            setCurrentMonthPercent(filteredFinancialFixeds[0].percent);
            setCurrentFixedIncome(filteredFinancialFixeds[0].fixedIncome);
            setCurrentFixedCosts(filteredFinancialFixeds[0].fixedCosts);
            setNumberPercent(filteredFinancialFixeds[0].percent);
            setIdFinancialFixeds(filteredFinancialFixeds[0].key || null);

            const itemDate = new Date(filteredFinancialFixeds[0].time);
            const month = itemDate.getMonth() + 1;
            if (getSelectCurrentDateTime('month') === month) {
              setShowBox(true);
            }

            setCurrentMonthName(monthsOfYear[currentDate.getMonth()]);
          }
        });
      };

      getFinancialFixeds();
      fetchTransactions();

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []),
  );

  useEffect(() => {
    const newTotalIncome = totalIncome + currentFixedIncome - currentFixedCosts;
    setFinalTotalIncome(newTotalIncome);
  }, [totalIncome, currentFixedIncome, currentFixedCosts, totalExpense]);

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
      setCurrentMonthPercent(numberPercent);
      setCurrentFixedIncome(fixedIncome);
      setCurrentFixedCosts(fixedCosts);
      setIdFinancialFixeds(newId);
      setNumberPercent(numberPercent);
      setCurrentMonthName(monthsOfYear[currentDate.getMonth()]);
    });
    setShowBox(true);
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
    const filteredData = data.filter(item => item.type === 'expense');
    if (filteredData.length === 0) {
      return [{value: 0, title: ''}];
    }

    const totals: {[key: string]: number} = {};
    const {start, end} = getStartAndEndOfCurrentMonth();

    filteredData.forEach(item => {
      const time = parseDateString(item.currentTime);
      if (time >= start && time <= end) {
        const formattedDate = time.toISOString().split('T')[0];
        totals[formattedDate] = (totals[formattedDate] || 0) + item.amount;
      }
    });

    const chartData: {title: string; value: number}[] = [];
    chartData.push({title: '', value: 100});

    let accumulatedPercentage = 100;
    let totalSpent = 0;

    Object.keys(totals)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .forEach(date => {
        const dailyTotal = totals[date] || 0;

        totalSpent += dailyTotal;

        let percentage =
          totalIncome > 0
            ? calculatePercentageRemaining(finalTotalIncome, totalSpent)
            : 0;

        accumulatedPercentage = percentage;

        chartData.push({
          title: date,
          value: accumulatedPercentage,
        });
      });

    return chartData;
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
          setShowBoxDelete(false);
          setShowBox(false);
        }
      } else {
        setShowBoxDelete(false);
      }
    },
    [idFinancialFixeds, setFinancialFixeds, setShowBoxDelete],
  );

  const handleEdit = useCallback((): void => {
    if (idFinancialFixeds !== null && numberPercent !== null) {
      editFinancialFixedService(idFinancialFixeds, {
        percent: numberPercent,
      }).then(() => {
        setFinancialFixeds(prev =>
          prev.map(item =>
            item.key === idFinancialFixeds
              ? {...item, percent: numberPercent}
              : item,
          ),
        );
        setCurrentMonthPercent(prev =>
          prev !== numberPercent ? numberPercent : prev,
        );
      });

      setShowBoxEdit(false);
    } else {
      Alert.alert(ERROR_MISSING_FIELD);
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {!showBox ? (
            <BoxAddFinance onSave={handleSave} />
          ) : !showBoxEdit ? (
            <>
              {showBoxDelete ? (
                <BoxDeleteFinance
                  handleDelete={handleDelete}
                  setShowBoxDelete={setShowBoxDelete}
                  currentMonthName={currentMonthName}
                  currentMonthPercent={currentMonthPercent}
                />
              ) : (
                <BoxChartFinance
                  currentMonthName={currentMonthName}
                  currentMonthPercent={currentMonthPercent}
                  totalExpense={totalExpense}
                  finalTotalIncome={finalTotalIncome}
                  chartData={chartData}
                  onPressEdit={(): void => setShowBoxEdit(true)}
                  onPressDelete={(): void => setShowBoxDelete(true)}
                />
              )}
            </>
          ) : (
            <BoxEditFinance
              currentMonthName={currentMonthName}
              currentMonthPercent={currentMonthPercent}
              totalExpense={totalExpense}
              finalTotalIncome={finalTotalIncome}
              numberPercent={numberPercent}
              setNumberPercent={setNumberPercent}
              handleEdit={handleEdit}
              setShowBoxEdit={setShowBoxEdit}
            />
          )}

          <View style={styles.flatList}>
            <FlatList
              data={financialFixeds}
              renderItem={({item}) => <RenderItem item={item} />}
              contentContainerStyle={styles.flatStyle}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.key || `${item.id}`}
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
