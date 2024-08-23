import React, {Fragment} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {
  AddCircle,
  BankSyncIcon,
  Card2,
  CVVIcon,
  EditIcon,
  InsightIcon,
  RecieptsIcon,
  SettingIcon,
  ShippingIcon,
  TagIcon,
  TodoIcon,
  UploadIcon,
} from '@/assets/svg';
import {img_logo1} from '@/assets/images';
import {colors} from '@/themes/colors';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import DrawerMenu from './DrawerMenu';
import {typography} from '@/themes/typography';
import {spacing} from '@/themes/spacing';

const menuItems = [
  {
    id: 1,
    icon: <ShippingIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Get Premium',
  },
  {
    id: 2,
    icon: <InsightIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Records',
  },
  {
    id: 3,
    icon: <BankSyncIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Bank Sync',
  },
  {
    id: 4,
    icon: <UploadIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Imports',
  },
  {
    id: 5,
    icon: <RecieptsIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Reciepts',
  },
  {
    id: 6,
    icon: <TagIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Tags',
  },
  {
    id: 7,
    icon: <Card2 width={18} height={18} color={colors.goldenRod} />,
    title: 'Cards',
  },
  {
    id: 8,
    icon: <AddCircle width={18} height={18} color={colors.goldenRod} />,
    title: 'Set Budget',
  },
  {
    id: 9,
    icon: <CVVIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'CVV',
  },
  {
    id: 10,
    icon: <TodoIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Lists',
  },
  {
    id: 11,
    icon: <SettingIcon width={18} height={18} color={colors.goldenRod} />,
    title: 'Settings',
  },
];

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.topContainer}>
        <View style={styles.boxTopLeft}>
          <Image style={styles.imageUser} source={img_logo1} />
          <View>
            <Text style={typography.Heading8}>Chandrama Saha</Text>
            <Text style={typography.Heading9}>Expensify</Text>
          </View>
        </View>
        <TouchableOpacity>
          <EditIcon width={18} height={18} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider}></View>

      <View style={styles.boxItem}>
        {menuItems.map((item, index) => (
          <DrawerMenu key={index} icon={item.icon} title={item.title} />
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
