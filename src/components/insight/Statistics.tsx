import LineChartTransaction from '@/commons/charts/LineChartTransaction';
import TabSecond from '@/commons/tabs/tabSecond';
import {tabTimeFrameOptions, tabTransaction} from '@/constants/insight.contant';
import {
  totalExpenseOverTime,
  totalIncomeOverTime,
} from '@/helpers/transaction.helper';
import {Transaction} from '@/models/transaction.model';
import {getTransactionsService} from '@/services/transactionManagement';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import {parseDateString} from '@/utils/parseDateString';
import React, {JSX, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Statistics = (): JSX.Element => {
  const {t} = useTranslation();
  const [activeTimeFrame, setActiveTimeFrame] = useState<string>('daily');
  const [activeTab, setActiveTab] = useState<string>('income');
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  useEffect(() => {
    const getTransactions = () => {
      getTransactionsService<Transaction[]>().then(transactions => {
        if (transactions) {
          const {startDate, endDate} = getDateRange(activeTimeFrame);

          const {totalExpense} = totalExpenseOverTime(
            transactions,
            startDate,
            endDate,
          );

          const {totalIncome} = totalIncomeOverTime(
            transactions,
            startDate,
            endDate,
          );

          setTotalIncome(totalIncome);
          setTotalExpense(totalExpense);
          setTransactions(transactions);
        }
      });
    };

    getTransactions();
  }, [activeTimeFrame]);

  const getDateRange = (
    timeFrame: string,
  ): {startDate: Date; endDate: Date} => {
    const now = new Date();
    let startDate: Date, endDate: Date;

    switch (timeFrame) {
      case 'daily':
        const dailyStart = new Date(now);
        startDate = new Date(dailyStart.setHours(0, 0, 0, 0));

        endDate = new Date(dailyStart.setHours(23, 59, 59, 999));
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59,
          999,
        );
        break;
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        break;
      default:
        startDate = new Date(0);
        endDate = new Date();
    }

    return {startDate, endDate};
  };

  const getDayOfWeek = (date: Date): string => {
    const day = [
      t('sun'),
      t('mon'),
      t('tue'),
      t('wed'),
      t('thu'),
      t('fri'),
      t('sat'),
    ];
    console.log(date.getDay());

    return day[date.getDay()];
  };

  const getWeekRange = (): {startDate: Date; endDate: Date} => {
    const now = new Date();

    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));

    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7));
    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(23, 59, 59, 999);

    return {startDate: startOfWeek, endDate: endOfWeek};
  };

  const monthsOfYear = [
    t('jan'),
    t('feb'),
    t('mar'),
    t('apr'),
    t('may'),
    t('jun'),
    t('jul'),
    t('aug'),
    t('sep'),
    t('oct'),
    t('nov'),
    t('dec'),
  ];

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

    data = data.filter(item => item.type === type);
    const totals: {[key: string]: number} = {};
    const now = new Date();

    if (mode === 'daily') {
      const {startDate, endDate} = getWeekRange();
      data.forEach(item => {
        const data = parseDateString(item.currentTime);
        if (data >= startDate && data <= endDate) {
          const dayOfWeek = getDayOfWeek(data);

          if (!totals[dayOfWeek]) {
            totals[dayOfWeek] = 0;
          }

          totals[dayOfWeek] += item.amount;
        }
      });

      const dayOfWeek = [
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

      return dayOfWeek.map(day => ({
        value: totals[day] || 0,
        title: day,
      }));
    } else if (mode === 'monthly') {
      const monthsToDisplay: string[] = [];

      for (let i = 6; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 2);
        monthsToDisplay.push(monthsOfYear[month.getMonth()]);
      }

      monthsToDisplay.unshift('');
      monthsToDisplay.push('');

      data.forEach(item => {
        const date = parseDateString(item.currentTime);
        const month = getMonth(date);

        if (monthsToDisplay.includes(month)) {
          if (!totals[month]) {
            totals[month] = 0;
          }
          totals[month] += item.amount;
        }
      });

      return monthsToDisplay.map(month => ({
        value: totals[month] || 0,
        title: month,
      }));
    } else {
      const yearsToDisplay: (number | string)[] = [];
      for (let i = 6; i >= 0; i--) {
        yearsToDisplay.push(now.getFullYear() - i);
      }
      yearsToDisplay.unshift('');
      yearsToDisplay.push('');

      data.forEach(item => {
        const date = parseDateString(item.currentTime);
        const year = date.getFullYear();

        if (yearsToDisplay.includes(year)) {
          if (!totals[year]) {
            totals[year] = 0;
          }
          totals[year] += item.amount;
        }
      });
      return yearsToDisplay.map(year => ({
        value: totals[year] || 0,
        title: year.toString(),
      }));
    }
    return [{value: 0, title: ''}];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'income':
        const chartData = getChartData(
          transactions || [],
          activeTimeFrame,
          'income',
        );

        let xAxisLabels: string[] = [];
        xAxisLabels = chartData.map(item => item.title);

        return (
          <LineChartTransaction
            data={chartData}
            xAxisLabels={xAxisLabels}
            typeTransaction={'income'}
            maxValue={totalIncome}
          />
        );
      case 'expense':
        const chartDataExpense = getChartData(
          transactions || [],
          activeTimeFrame,
          'expense',
        );

        let xAxisLabelsExpense: string[] = [];
        xAxisLabelsExpense = chartDataExpense.map(item => item.title);
        return (
          <LineChartTransaction
            data={chartDataExpense}
            xAxisLabels={xAxisLabelsExpense}
            typeTransaction={'expense'}
            maxValue={0}
          />
        );
      default:
        return null;
    }
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
        onTabChange={setActiveTab}
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
