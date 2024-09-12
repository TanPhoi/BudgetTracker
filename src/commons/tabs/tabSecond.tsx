import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import {t} from 'i18next';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type TabSecondProps = {
  tabs: {key: string; label: string}[];
  activeTab: string;
  onTabChange: (key: string) => void;
};

const TabSecond = ({
  tabs,
  activeTab,
  onTabChange,
}: TabSecondProps): JSX.Element => {
  return (
    <View style={styles.tabs}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={(): void => onTabChange(tab.key)}>
          <Text
            style={[
              styles.tabText,
              typography.Heading5,
              activeTab === tab.key && styles.activeTabText,
            ]}>
            {t(tab.label)}
          </Text>
          <View
            style={[
              activeTab === tab.key ? styles.activeTab : styles.inactiveTab,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    rowGap: 10,
  },
  tabText: {
    color: colors.pureWhite,
  },
  activeTabText: {
    color: colors.goldenRod,
  },
  activeTab: {
    width: '100%',
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.goldenRod,
  },
  inactiveTab: {
    width: '100%',
    height: 4,
    borderRadius: 4,
    backgroundColor: colors.transparentWhite,
  },
});

export default TabSecond;
