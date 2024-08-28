import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {typography} from '@/themes/typography';
import {t} from 'i18next';
import React, {JSX, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type TabProps = {
  onPress: (value: string) => void;
};

const Tab = ({onPress}: TabProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('income');

  const handlePress = (tab: string): void => {
    setActiveTab(tab);
    onPress(tab);
  };

  const gradientColors =
    activeTab === 'income'
      ? [colors.crimsonRed, colors.goldenRod]
      : [colors.goldenRod, colors.crimsonRed];

  return (
    <LinearGradient
      colors={gradientColors}
      locations={[0.4, 0.6]}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={styles.container}>
      <TouchableOpacity
        style={styles.btnINCOME}
        onPress={(): void => handlePress('income')}>
        <Text style={typography.Heading5}>{t('income')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnEXPENSE}
        onPress={(): void => handlePress('expense')}>
        <Text style={typography.Heading5}>{t('expense')}</Text>
      </TouchableOpacity>
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

export default Tab;
