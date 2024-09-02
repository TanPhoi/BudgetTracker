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

type InputMainProps = {
  label: string;
  value: string;
  editable?: boolean;
  prefix?: string;
  onChange?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

const InputMain = ({
  label,
  value,
  editable,
  onChange,
  prefix,
  keyboardType,
}: InputMainProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={[typography.Heading3, styles.title]}>{label}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={typography.Heading11}>{prefix}</Text>
        <TextInput
          style={[typography.Heading11, styles.input]}
          placeholderTextColor={colors.pureWhite}
          value={value}
          onChangeText={onChange}
          editable={editable}
          keyboardType={keyboardType}
        />
      </View>

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
    width: '96%',
    height: 30,
    paddingVertical: 2,
    paddingLeft: -5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.goldenRod,
  },
});

export default InputMain;
