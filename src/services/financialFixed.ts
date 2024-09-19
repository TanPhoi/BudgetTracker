import {
  GET_FINANCIAL_FIXED_ERROR,
  SET_FINANCIAL_FIXED_ERROR,
} from '@/constants/message.constant';
import {FinancialFixed} from '@/models/financialFixed.model';
import database from '@react-native-firebase/database';

const reference = database().ref('user/financialFixed');

export const addFinancialFixedService = async (
  data: FinancialFixed,
): Promise<string> => {
  try {
    const newRef = reference.push();
    await newRef.set(data);
    return newRef.key as string;
  } catch (error) {
    console.error(SET_FINANCIAL_FIXED_ERROR, error);
    throw error;
  }
};

export const getFinancialFixedsService = async <T>(): Promise<T[] | null> => {
  try {
    const snapshot = await reference.once('value');
    const data = snapshot.val();
    if (data) {
      return Object.entries(data).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return {
            key,
            ...value,
          } as T;
        }
        console.warn('Value is not an object:', value);
        return {key, value} as T;
      });
    }
    return null;
  } catch (error) {
    console.error(GET_FINANCIAL_FIXED_ERROR, error);
    throw error;
  }
};

export const deleteFinancialFixedService = async (
  key: string,
): Promise<void> => {
  try {
    await reference.child(key).remove();
  } catch (error) {
    console.error('Error deleting financial fixed:', error);
    throw error;
  }
};

export const editFinancialFixedService = async (
  key: string,
  data: any,
): Promise<void> => {
  try {
    await reference.child(key).update(data);
  } catch (error) {
    console.error('Error editing financial fixed:', error);
    throw error;
  }
};
