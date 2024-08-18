import {colors} from '@/themes/colors';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type NumberButtonProps = {
  text: string;
  onPress: (value: string) => void;
};

const NumberButton = ({text, onPress}: NumberButtonProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.box} onPress={(): void => onPress(text)}>
      <Text style={styles.buttonText}>{text}</Text>
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
  buttonText: {
    color: colors.pureWhite,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: 0.54,
    fontFamily: 'DMSans-Bold',
  },
});

export default NumberButton;
