import React, {JSX} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {EditIcon} from '@/assets/svg';
import {img_logo1} from '@/assets/images';
import {colors} from '@/themes/colors';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import DrawerMenu from './DrawerMenu';
import {typography} from '@/themes/typography';
import {spacing} from '@/themes/spacing';
import {menuItems} from '@/mock/menuItem';
import {t} from 'i18next';

const CustomDrawer = (props: DrawerContentComponentProps): JSX.Element => {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.topContainer}>
        <View style={styles.boxTopLeft}>
          <Image style={styles.imageUser} source={img_logo1} />
          <View>
            <Text style={typography.Heading8}>Chandrama Saha</Text>
            <Text style={typography.Heading9}>{t('expensify')}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <EditIcon width={18} height={18} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider}></View>
      <View style={styles.boxItem}>
        {menuItems.map((item, index) => (
          <DrawerMenu
            key={index}
            icon={item.icon}
            title={t(`menu.${item.title}`)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    marginTop: spacing.xxl,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  boxTopLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  imageUser: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'red',
  },
  divider: {
    marginTop: spacing.s,
    height: 1,
    backgroundColor: colors.darkGray,
  },
  boxItem: {
    rowGap: 30,
    marginTop: spacing.md,
  },
});

export default CustomDrawer;
