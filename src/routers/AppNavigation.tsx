import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AddExpense, OptionExpense, PinCode, Splash} from '@/screens';
import {colors} from '@/themes/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from '@/routers/TabNavigation';
import getStorageData from '@/utils/getStorageData';
import setStorageData from '@/utils/setStorageData';
import {ExpenseType} from '@/models/expenseType.model';

export type RootStackParamsList = {
  Splash: undefined;
  PinCode: undefined;
  TabNavigation: undefined;
  AddExpense: {expense: ExpenseType} | undefined;
  OptionExpense: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();
const AppNavigation = (): JSX.Element => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAppState = (): void => {
      getStorageData('isFirstLaunch')
        .then(firstLaunch => {
          if (!firstLaunch) {
            setStorageData('isFirstLaunch', 'true');
            setIsFirstLaunch(false);
          } else {
            setIsFirstLaunch(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    checkAppState();
  }, []);

  if (loading) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isFirstLaunch && <Stack.Screen name="Splash" component={Splash} />}
      <Stack.Screen name="PinCode" component={PinCode} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="OptionExpense" component={OptionExpense} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.midnightBlack,
  },
});

export default AppNavigation;
