import React, {useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import Header from '@/commons/headers/Header';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {img_qr_code, img_user} from '@/assets/images';
import {typography} from '@/themes/typography';
import Action from '@/components/userProfile/Action';
import {SettingIcon} from '@/assets/svg';
import {ScrollView} from 'react-native-gesture-handler';
import setStorageData from '@/utils/setStorageData';
import {
  actionCards,
  actionPaymentMethods,
  languages,
} from '@/constants/userProfile.contant';

type UserProfileProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'TabNavigation'>;
};

const UserProfile = ({navigation}: UserProfileProps): JSX.Element => {
  const {t, i18n} = useTranslation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const switchLanguage = (lang: string): void => {
    setStorageData('language', lang);
    i18n.changeLanguage(lang);
    moment.locale(lang);
    setModalVisible(false);
  };

  // Hàm xử lý chung cho tất cả các hành động thanh toán
  const handlePaymentAction = (type: string): void => {
    switch (type) {
      case 'bank_balance':
        // Xử lý ngân hàng
        break;
      case 'physical_cash':
        // Xử lý tiền mặt
        break;
      default:
        break;
    }
  };

  const handleCardAction = (type: string): void => {
    switch (type) {
      case 'credit_card':
        // Xử lý thẻ tín dụng
        break;
      case 'debit_card':
        // Xử lý thẻ ghi nợ
        break;
      default:
        break;
    }
  };

  const handleChangeLanguage = (): void => {
    setModalVisible(true);
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
      <View style={styles.header}>
        <Header label={t('user_profile')} onPress={handleBack} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={[styles.boxContainer, styles.boxTop]}>
            <View>
              <Text style={typography.Heading20}>Chandrama Saha</Text>
              <Text style={typography.Heading21}>+91 XXXXX XXXXX</Text>
              <Text style={typography.Heading21}>chandramasaha@xxxxx</Text>
            </View>
            <View>
              <View style={styles.boxImgUser}>
                <Image style={styles.imgUser} source={img_user} />
              </View>
              <View style={styles.boxImgQR}>
                <Image style={styles.imgQR} source={img_qr_code} />
              </View>
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={typography.Heading16}>{t('payment_methods')}</Text>

            <View style={styles.boxBottom}>
              {actionPaymentMethods(handlePaymentAction).map(item => (
                <Action
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={typography.Heading16}>{t('cards')}</Text>

            <View style={styles.boxBottom}>
              {actionCards(handleCardAction).map(item => (
                <Action
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  onPress={item.onPress}
                />
              ))}
            </View>
          </View>

          <View style={styles.boxContainer}>
            <Text style={typography.Heading16}>{t('language')}</Text>

            <View style={styles.boxBottom}>
              <Action
                icon={SettingIcon}
                title={t('change_language')}
                onPress={handleChangeLanguage}
              />
            </View>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t('select_language')}</Text>
              {languages.map(lang => (
                <Pressable
                  key={lang.code}
                  style={styles.modalButton}
                  onPress={() => switchLanguage(lang.code)}>
                  <Text style={styles.modalButtonText}>{lang.name}</Text>
                </Pressable>
              ))}
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>{t('cancel')}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
  },
  header: {
    marginTop: spacing.lg,
  },

  container: {
    flex: 1,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    rowGap: 35,
  },
  boxContainer: {
    padding: spacing.md,
    backgroundColor: colors.white_transparent_10,
    borderRadius: 10,
  },
  boxTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    marginTop: spacing.s,
  },
  boxImgUser: {
    borderWidth: 5,
    borderRadius: 50,
    borderColor: 'white',
  },
  imgUser: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  boxImgQR: {
    position: 'absolute',
    bottom: -8,
    right: -5,
    width: 34,
    height: 34,
    backgroundColor: colors.goldenRod,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgQR: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },

  text: {
    fontSize: 20,
    marginBottom: spacing.sm,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: spacing.md,
  },
  modalButton: {
    marginVertical: spacing.sm,
    padding: spacing.sm,
    backgroundColor: colors.midnightBlack,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfile;
