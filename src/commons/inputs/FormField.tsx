import React, {JSX} from 'react';
import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {spacing} from '@/themes/spacing';

type FormFieldProps = {
  label: string;
  value: string;
  isEditable?: boolean;
  onChange?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

const FormField = ({
  label,
  value,
  isEditable,
  onChange,
  keyboardType,
}: FormFieldProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={[typography.Heading3, styles.title]}>{label}</Text>
      <TextInput
        style={[typography.Heading11, styles.input]}
        placeholderTextColor={colors.pureWhite}
        value={value}
        onChangeText={onChange}
        editable={isEditable}
        keyboardType={keyboardType}
      />
      <View style={styles.divider}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.s,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.s,
    borderColor: colors.pureWhite,
    borderRadius: 16,
    backgroundColor: colors.indigoNight,
    marginHorizontal: spacing.md,
    elevation: 4,
  },
  title: {
    color: colors.pureWhite,
  },
  input: {
    height: 40,
  },
  divider: {
    height: 1,
    backgroundColor: colors.goldenRod,
  },
});

export default FormField;
