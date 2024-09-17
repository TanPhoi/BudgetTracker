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

export const totalTransactionOverTime = (
  transactions: Transaction[],
  type: string,
  startDate: Date,
  endDate: Date,
) => {
  const filteredTransaction = transactions.filter(transaction => {
    const transactionDate = parseDateString(transaction.currentTime);
    return (
      transaction.type === type &&
      transactionDate >= startDate &&
      transactionDate <= endDate
    );
  });

  const totalTransaction = filteredTransaction.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  return {filteredTransaction, totalTransaction};
};
