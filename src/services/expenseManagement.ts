import {ExpenseType} from '@/models/expenseType.model';
import database from '@react-native-firebase/database';

const reference = database().ref('user/expense');

export const setExpenseService = async (data: ExpenseType): Promise<void> => {
  try {
    const newRef = reference.push();
    await newRef.set(data);
    console.log('Expense data has been added successfully');
  } catch (error) {
    console.error('Failed to add expense data:', error);
    throw error;
  }
};

export const getExpenseService = async <T>(): Promise<T | null> => {
  try {
    const snapshot = await reference.once('value');
    const data = snapshot.val();
    const expensesArray = data ? Object.values(data) : [];
    return expensesArray ? (expensesArray as T) : null;
  } catch (error) {
    console.error('Failed to get expense data:', error);
    return null;
  }
};
