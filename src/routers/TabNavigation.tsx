import React, {cloneElement, JSX} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cards, Home, Insight, UserProfile} from '@/screens';
import {CardIcon, HomeIcon, InsightIcon, UserIcon} from '@/assets/svg';
import {View, StyleSheet} from 'react-native';
import {colors} from '@/themes/colors';

const Tab = createBottomTabNavigator();

const icons: Record<string, JSX.Element> = {
  Home: <HomeIcon />,
  Cards: <CardIcon />,
  Insight: <InsightIcon />,
  UserProfile: <UserIcon />,
};

const TabNavigation = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const IconComponent = icons[route.name];
          return (
            <View style={styles.iconContainer}>
              {cloneElement(IconComponent, {
                color: focused ? colors.goldenRod : colors.pureWhite,
              })}
              {focused && <View style={styles.focusedIconShadow}></View>}
            </View>
          );
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 120,
          backgroundColor: colors.midnightBlack,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cards" component={Cards} />
      <Tab.Screen name="Insight" component={Insight} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    width: 40,
    height: 40,
    top: -6,
  },
  focusedIconShadow: {
    elevation: 8,
    borderRadius: 50,
    width: 40,
    height: 40,
    position: 'absolute',
    zIndex: -1,
    top: -20,
    shadowColor: colors.goldenRod,
  },
});

export default TabNavigation;
