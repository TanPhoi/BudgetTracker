import React, {JSX} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Cards = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Open Drawer" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Cards;
