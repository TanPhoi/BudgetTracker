import {Transaction} from '@/models/transaction.model';

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
