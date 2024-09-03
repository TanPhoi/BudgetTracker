import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import React, {JSX} from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput, View} from 'react-native';

type InputCardProps = {
  placeHolder: string;
  onChange: (value: string) => void;
  value?: string;
  keyboardType: KeyboardTypeOptions;
  maxLength?: number;
};

const InputCard = ({
  placeHolder,
  onChange,
  value,
  keyboardType,
  maxLength,
}: InputCardProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, typography.Heading17]}
        placeholder={placeHolder}
        placeholderTextColor={colors.pureWhite}
        keyboardType={keyboardType}
        onChangeText={onChange}
        value={value}
        maxLength={maxLength}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(25, 23, 61, 0.50)',
    borderRadius: 15,
  },
  input: {
    paddingHorizontal: spacing.sm,
    height: 44,
  },
});

export default InputCard;
