import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerNavigator from '@/routers/DrawerNavigator';
import AppNavigation from '@/routers/AppNavigation';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <DrawerNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
