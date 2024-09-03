import {
  FETCH_TRANSACTION_ERROR,
  SET_TRANSACTION_ERROR,
} from '@/constants/message.constant';
import {CardType} from '@/screens/cards/Cards';
import database from '@react-native-firebase/database';

const reference = database().ref('user/cards');

export const setCardService = async (data: CardType): Promise<void> => {
  try {
    const newRef = reference.push();
    await newRef.set(data);
  } catch (error) {
    console.error(SET_TRANSACTION_ERROR, error);
    throw error;
  }
};

export const getCardService = async <T>(): Promise<T | null> => {
  try {
    const snapshot = await reference.once('value');
    const data = snapshot.val();
    const cardsArray = data ? Object.values(data) : [];
    return cardsArray ? (cardsArray as T) : null;
  } catch (error) {
    console.error(FETCH_TRANSACTION_ERROR, error);
    return null;
  }
};
