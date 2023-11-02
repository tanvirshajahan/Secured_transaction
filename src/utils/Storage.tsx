import AsyncStorage from "@react-native-async-storage/async-storage";
import { TransactionDetails } from "../redux";


//saving data
export const storeData = async (value: TransactionDetails, key: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  //reading data
  export const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };