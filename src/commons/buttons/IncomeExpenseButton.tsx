import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import React, {JSX} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const IncomeExpenseButton = (): JSX.Element => {
  return (
    <LinearGradient
      colors={[colors.crimsonRed, colors.goldenRod]}
      locations={[0.4, 0.6]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <View style={styles.btnINCOME}>
        <Text style={typography.Heading5}>INCOME</Text>
      </View>
      <View style={styles.btnEXPENSE}>
        <Text style={typography.Heading5}>EXPENSE</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    zIndex: 1,
  },
  btnINCOME: {
    paddingVertical: spacing.s,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnEXPENSE: {
    paddingVertical: spacing.s,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IncomeExpenseButton;
