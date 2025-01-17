import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import React, {ElementType, JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type ActionProps = {
  icon: ElementType;
  title: string;
  onPress: () => void;
};

const Action = ({icon: Icon, title, onPress}: ActionProps): JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.boxAction}>
      <View style={styles.actionIcon}>
        <Icon width={47} height={49} color={colors.pureWhite} />
      </View>
      <Text style={typography.Heading22}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxAction: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
  actionIcon: {
    padding: spacing.md,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.midnightBlack,
  },
});

export default Action;
