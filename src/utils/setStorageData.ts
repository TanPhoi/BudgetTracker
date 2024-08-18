import {ADD_DATA_ERROR} from '@/constants/message.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setStorageData = async <T>(key: string, data: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(ADD_DATA_ERROR, error);
    throw error;
  }
};

export default setStorageData;
