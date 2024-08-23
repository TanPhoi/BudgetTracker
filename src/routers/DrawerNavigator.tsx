import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './AppNavigation';
import {Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomDrawer from '@/components/drawer/CustomDrawer';
import {colors} from '@/themes/colors';

const Drawer = createDrawerNavigator();
const DrawerNavigator = (): JSX.Element => {
  const {width, height} = Dimensions.get('window');
  const drawerHeight = height * 0.85;
  const drawerWidth = width * 0.86;
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="App"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: 'transparent',
            width: drawerWidth,
            height: drawerHeight,
          },
          sceneContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
        drawerContent={props => (
          <LinearGradient
            colors={[colors.midnightBlack, colors.semiTransparentRed]}
            locations={[0.9, 1]}
            start={{x: 1, y: 1}}
            end={{x: 0.4, y: 0}}
            style={[StyleSheet.absoluteFillObject]}>
            <CustomDrawer {...props} />
          </LinearGradient>
        )}>
        <Drawer.Screen name="App" component={AppNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigator;
