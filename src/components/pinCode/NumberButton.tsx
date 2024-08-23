import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type NumberButtonProps = {
  text: string;
  onPress: (value: string) => void;
};

const NumberButton = ({text, onPress}: NumberButtonProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.box} onPress={(): void => onPress(text)}>
      <Text style={typography.Heading2}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NumberButton;
