import {Transaction} from '@/models/transaction.model';
import {parseDateString} from '@/utils/parseDateString';

export const calculateTotalIncomeAmount = (
  transactions: Transaction[],
): number => {
  const filteredIncome = transactions.filter(
    transaction => transaction.type === 'income',
  );

  return filteredIncome.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);
};

export const totalExpenseOverTime = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
) => {
  const filteredExpenses = transactions.filter(transaction => {
    const transactionDate = parseDateString(transaction.currentTime);
    return (
      transaction.type === 'expense' &&
      transactionDate >= startDate &&
      transactionDate <= endDate
    );
  });

  const totalExpense = filteredExpenses.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  return {filteredExpenses, totalExpense};
};

export const totalIncomeOverTime = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date,
) => {
  const filteredIncomes = transactions.filter(transaction => {
    const transactionDate = parseDateString(transaction.currentTime);
    return (
      transaction.type === 'income' &&
      transactionDate >= startDate &&
      transactionDate <= endDate
    );
  });

  const totalIncome = filteredIncomes.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  return {filteredIncomes, totalIncome};
};
