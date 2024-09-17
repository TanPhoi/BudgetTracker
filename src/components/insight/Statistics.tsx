import AreaLineChart from '@/commons/charts/AreaLineChart';
import TabSecond from '@/commons/tabs/tabSecond';
import {
  InsignTransaction,
  monthsOfYear,
  tabTimeFrameOptions,
  tabTransaction,
} from '@/constants/insight.contant';
import {totalTransactionOverTime} from '@/helpers/transaction.helper';
import {Transaction} from '@/models/transaction.model';
import {getTransactionsService} from '@/services/transactionManagement';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import {getDateRange} from '@/utils/getDateRange';
import {getDayOfWeek} from '@/utils/getDayOfWeek';
import {getWeekRange} from '@/utils/getWeekRange';
import {parseDateString} from '@/utils/parseDateString';
import React, {JSX, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Statistics = (): JSX.Element => {
  const {t} = useTranslation();
  const [activeTimeFrame, setActiveTimeFrame] = useState<string>('daily');
  const [activeTab, setActiveTab] = useState<InsignTransaction>('income');
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    const getTransactions = () => {
      getTransactionsService<Transaction[]>().then(transactions => {
        if (transactions) {
          const {startDate, endDate} = getDateRange(activeTimeFrame);

          const {totalTransaction} = totalTransactionOverTime(
            transactions,
            activeTab,
            startDate,
            endDate,
          );
          setTotalIncome(totalTransaction);
          setTotalExpense(totalTransaction);
          setTransactions(transactions);
        }
      });
    };

    getTransactions();
  }, [activeTimeFrame]);

  const getMonth = (date: Date): string => {
    return monthsOfYear[date.getMonth()];
  };

  const getChartData = (
    data: Transaction[],
    mode: string,
    type: string,
  ): {value: number; title: string}[] => {
    if (!Array.isArray(data) || data.length === 0) {
      return [{value: 0, title: ''}];
    }

    const filteredData = data.filter(item => item.type === type);
    const totals: {[key: string]: number} = {};
    const now = new Date();

    const addToTotals = (key: string, amount: number) => {
      totals[key] = (totals[key] || 0) + amount;
    };

    const modes: {[key: string]: () => {value: number; title: string}[]} = {
      daily: () => {
        const {startDate, endDate} = getWeekRange();
        filteredData.forEach(item => {
          const date = parseDateString(item.currentTime);
          if (date >= startDate && date <= endDate) {
            const dayOfWeek = getDayOfWeek(date);
            addToTotals(dayOfWeek, item.amount);
          }
        });

        const dayOfWeekLabels = [
          '',
          t('mon'),
          t('tue'),
          t('wed'),
          t('thu'),
          t('fri'),
          t('sat'),
          t('sun'),
          '',
        ];
        return dayOfWeekLabels.map(day => ({
          value: totals[day] || 0,
          title: day,
        }));
      },
      monthly: () => {
        const monthsToDisplay: string[] = [];
        for (let i = 6; i >= 0; i--) {
          const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
          monthsToDisplay.push(monthsOfYear[month.getMonth()]);
        }
        monthsToDisplay.unshift('');
        monthsToDisplay.push('');

        filteredData.forEach(item => {
          const date = parseDateString(item.currentTime);
          const month = getMonth(date);
          if (monthsToDisplay.includes(month)) {
            addToTotals(month, item.amount);
          }
        });

        return monthsToDisplay.map(month => ({
          value: totals[month] || 0,
          title: month,
        }));
      },
      yearly: () => {
        const yearsToDisplay: string[] = [];
        for (let i = 6; i >= 0; i--) {
          yearsToDisplay.push((now.getFullYear() - i).toString());
        }
        yearsToDisplay.unshift('');
        yearsToDisplay.push('');

        filteredData.forEach(item => {
          const date = parseDateString(item.currentTime);
          const year = date.getFullYear().toString();
          if (yearsToDisplay.includes(year)) {
            addToTotals(year, item.amount);
          }
        });

        return yearsToDisplay.map(year => ({
          value: totals[year] || 0,
          title: year,
        }));
      },
    };

    return modes[mode] ? modes[mode]() : [{value: 0, title: ''}];
  };

  const handleTabChange = (key: InsignTransaction) => {
    setActiveTab(key);
  };

  const renderContent = () => {
    const isIncome = activeTab === 'income';
    const transactionType = isIncome ? 'income' : 'expense';
    const maxValue = isIncome ? totalIncome : totalExpense;

    if (activeTab !== 'income' && activeTab !== 'expense') {
      return null;
    }

    const chartData = getChartData(
      transactions || [],
      activeTimeFrame,
      transactionType,
    );
    const xAxisLabels = chartData.map(item => item.title);

    return (
      <AreaLineChart
        data={chartData}
        xAxisLabels={xAxisLabels}
        typeTransaction={transactionType}
        maxValue={maxValue}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        {tabTimeFrameOptions.map(option => (
          <TouchableOpacity
            onPress={(): void => setActiveTimeFrame(option.key)}
            key={option.key}
            style={styles.buttonWrapper}>
            {activeTimeFrame === option.key ? (
              <LinearGradient
                colors={[colors.goldenRod, colors.crimsonRed]}
                locations={[0, 1]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.buttonTime}>
                <Text style={typography.Heading19}>{t(option.label)}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.buttonTime}>
                <Text style={typography.Heading19}>{t(option.label)}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[typography.Heading10, styles.txtTotal]}>
        {t('total_expense')}
      </Text>
      <Text style={[typography.Heading4, styles.txtTotalAmount]}>
        {t('currency')}
        {totalExpense}
      </Text>

      <TabSecond
        tabs={tabTransaction}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeContainer: {
    marginTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 5,
    paddingHorizontal: spacing.md,
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonTime: {
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  txtTotal: {
    textAlign: 'center',
    color: colors.goldenRod,
    marginTop: spacing.sm,
  },
  txtTotalAmount: {
    textAlign: 'center',
    marginTop: spacing.xxs,
  },
  tabs: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    rowGap: 10,
  },
  tabText: {
    color: colors.pureWhite,
  },
  activeTabText: {
    color: colors.goldenRod,
  },
  inactiveTab: {
    width: '100%',
    height: 3,
    borderRadius: 4,
    backgroundColor: colors.transparentWhite,
  },
  activeTab: {
    width: '100%',
    height: 3,
    borderRadius: 4,
    backgroundColor: colors.goldenRod,
  },
  content: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10,
  },
});

export default Statistics;
