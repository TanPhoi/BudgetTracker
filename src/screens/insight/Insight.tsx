import Header from '@/commons/headers/Header';
import TabSecond from '@/commons/tabs/tabSecond';
import SavingsPlan from '@/components/insight/SavingsPlan';
import Statistics from '@/components/insight/Statistics';
import {tabFinancial} from '@/constants/insight.contant';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {t} from 'i18next';
import React, {JSX, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type InsightProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};

const Insight = ({navigation}: InsightProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('statistics');

  const renderContent = () => {
    switch (activeTab) {
      case 'statistics':
        return <Statistics />;
      case 'savingsplan':
        return <SavingsPlan />;
      default:
        return null;
    }
  };

  const handleBack = (): void => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={[colors.midnightBlack, colors.semiTransparentRed]}
      locations={[0.9, 1]}
      start={{x: 1, y: 1}}
      end={{x: 0.4, y: 0}}
      style={styles.gradient}>
      <View style={styles.container}>
        <Header label={t('insight')} onPress={handleBack} />

        <TabSecond
          tabs={tabFinancial}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <View style={styles.content}>{renderContent()}</View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  container: {
    marginTop: spacing.xl,
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Insight;
