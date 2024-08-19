import {FETCH_PIN_ERROR, SET_PIN_ERROR} from '@/constants/message.constant';
import database from '@react-native-firebase/database';

const referencePin = database().ref('user/storedPin');

export const getPin = (): Promise<string> => {
  return referencePin
    .once('value')
    .then(snapshot => snapshot.val() || '')
    .catch(error => {
      console.error(FETCH_PIN_ERROR, error);
      return '';
    });
};

export const setPin = (pin: string): Promise<void> => {
  return referencePin.set(pin).catch(error => {
    console.error(SET_PIN_ERROR, error);
    throw error;
  });
};
