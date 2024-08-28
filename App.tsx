import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import DrawerNavigator from '@/routers/DrawerNavigator';

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
