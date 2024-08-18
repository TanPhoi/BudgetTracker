import {GET_DATA_ERROR} from '@/constants/message.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error(GET_DATA_ERROR, error);
    return null;
  }
};

export default getStorageData;
