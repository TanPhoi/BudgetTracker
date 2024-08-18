import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PinCode, Splash} from '@/screens';
import {colors} from '@/themes/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from '@/routers/TabNavigation';
import getStorageData from '@/utils/getStorageData';
import setStorageData from '@/utils/setStorageData';

export type RootStackParamsList = {
  Splash: undefined;
  PinCode: undefined;
  TabNavigation: undefined;
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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isFirstLaunch && <Stack.Screen name="Splash" component={Splash} />}
        <Stack.Screen name="PinCode" component={PinCode} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
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
