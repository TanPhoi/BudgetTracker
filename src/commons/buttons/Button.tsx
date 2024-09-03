import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  label: string;
  onPress: () => void;
};

const Button = ({label, onPress}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={[colors.goldenRod, colors.crimsonRed]}
        locations={[0.2, 0.9]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <Text style={typography.Heading17}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 127,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default Button;
