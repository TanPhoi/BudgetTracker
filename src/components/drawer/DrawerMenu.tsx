import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import React, {FunctionComponent, JSX, SVGProps} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type DrawerMenuProps = {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
};

const DrawerMenu = ({icon: Icon, title}: DrawerMenuProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.menuContainer}>
      <Icon width={18} height={18} color={colors.goldenRod} />
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
