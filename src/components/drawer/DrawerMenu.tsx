import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type DrawerMenuProps = {
  icon: JSX.Element;
  title: string;
};

const DrawerMenu = ({icon, title}: DrawerMenuProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.menuContainer}>
      {icon}
      <Text style={typography.Heading10}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    columnGap: 38,
    marginLeft: spacing.lg,
    alignItems: 'center',
  },
});

export default DrawerMenu;
