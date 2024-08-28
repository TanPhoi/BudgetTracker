import {
  FETCH_TRANSACTION_ERROR,
  SET_TRANSACTION_ERROR,
} from '@/constants/message.constant';
import {ExpenseType} from '@/models/expenseType.model';
import database from '@react-native-firebase/database';

const reference = database().ref('user/expense');

export const setExpenseService = async (data: ExpenseType): Promise<void> => {
  try {
    const newRef = reference.push();
    await newRef.set(data);
  } catch (error) {
    console.error(SET_TRANSACTION_ERROR, error);
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
    console.error(FETCH_TRANSACTION_ERROR, error);
    return null;
  }
};
