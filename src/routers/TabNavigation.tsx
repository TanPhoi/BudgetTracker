import React, {JSX} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cards, Home, Insight, UserProfile} from '@/screens';
import {CardIcon, HomeIcon, InsightIcon, UserIcon} from '@/assets/svg';

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
          return React.cloneElement(IconComponent, {
            color: focused ? 'black' : 'gray',
          });
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cards" component={Cards} />
      <Tab.Screen name="Insight" component={Insight} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
