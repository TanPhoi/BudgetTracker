import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '@/themes/colors';
import {typography} from '@/themes/typography';

type PercentOptionProps = {
  options: {id: number; numberPercent: number}[];
  selectedPercent: number | null;
  setSelectedPercent: (value: number) => void;
};

const PercentOption = ({
  options,
  selectedPercent,
  setSelectedPercent,
}: PercentOptionProps): JSX.Element => {
  return (
    <View style={styles.boxPercents}>
      {options.map(item => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.boxPercent,
            selectedPercent === item.numberPercent && styles.selectBoxPercent,
          ]}
          onPress={() => setSelectedPercent(item.numberPercent)}>
          <Text
            style={[
              typography.Heading23,
              selectedPercent === item.numberPercent && styles.selectTxtPercent,
            ]}>
            {item.numberPercent}%
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  boxPercents: {
    flexDirection: 'row',
    columnGap: 10,
  },
  boxPercent: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkIndigo,
    borderRadius: 15,
  },
  selectBoxPercent: {
    borderColor: colors.goldenRod,
    borderWidth: 1,
  },
  selectTxtPercent: {
    color: colors.goldenRod,
  },
});

export default memo(PercentOption);
