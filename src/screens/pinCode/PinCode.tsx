import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import {img_enter_pin} from '@/assets/images';
import {ArrowLeft} from '@/assets/svg';
import NumberButton from '@/components/pinCode/NumberButton';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {colors} from '@/themes/colors';
import {spacing} from '@/themes/spacing';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {triggerShake} from '@/animations/shakeAnimation';
import {getPin, setPin} from '@/services/authentication';
import {typography} from '@/themes/typography';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import i18n from '@/languages/i18n';
import getStorageData from '@/utils/getStorageData';

type PinCodeProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'PinCode'>;
};

const PinCode = ({navigation}: PinCodeProps): JSX.Element => {
  const {t} = useTranslation();
  const [pin, setPinState] = useState<string>('');
  const [storedPin, setStoredPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getPin().then(pin => setStoredPin(pin));
  }, []);

  useEffect(() => {
    if (pin.length === 4) {
      submitOnPinComplete();
    }
  }, [pin]);

  useEffect(() => {
    const loadLanguage = (): void => {
      getStorageData<string>('language').then(language => {
        if (language) {
          i18n.changeLanguage(language);
          moment.locale(language);
        }
      });
    };
    loadLanguage();
  }, [i18n]);

  const handlePress = (value: string): void => {
    if (pin.length < 4) {
      setPinState(prevPin => prevPin + value);
    }
  };

  const submitOnPinComplete = (): void => {
    if (!storedPin && pin.length === 4) {
      setPin(pin).then(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'TabNavigation'}],
        });
      });
    } else {
      if (pin !== storedPin) {
        setIsError(true);
        triggerShake(shakeAnimation);
        setTimeout(() => {
          setPinState('');
          setIsError(false);
        }, 1000);
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'TabNavigation'}],
        });
      }
    }
  };

  const removeLastDigit = (): void => {
    setPinState(prevPin => prevPin.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={img_enter_pin} style={styles.imgEnterPin}>
        <Text style={[styles.title, typography.Heading]}>{t('enter_pin')}</Text>
        <Animated.View
          style={[
            styles.pinDisplay,
            {transform: [{translateX: shakeAnimation}]},
          ]}>
          {Array.from({length: 4}, (_, index) => (
            <View
              key={index}
              style={[
                styles.pinBox,
                pin.length > index && styles.pinFilled,
                isError && styles.pinError,
              ]}
            />
          ))}
        </Animated.View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            {['1', '2', '3'].map(value => (
              <NumberButton key={value} text={value} onPress={handlePress} />
            ))}
          </View>
          <View style={styles.buttonRow}>
            {['4', '5', '6'].map(value => (
              <NumberButton key={value} text={value} onPress={handlePress} />
            ))}
          </View>
          <View style={styles.buttonRow}>
            {['7', '8', '9'].map(value => (
              <NumberButton key={value} text={value} onPress={handlePress} />
            ))}
          </View>

          <View style={styles.buttonRow}>
            <View style={styles.boxNumber} />

            <NumberButton text="0" onPress={handlePress} />

            <TouchableOpacity
              style={styles.boxNumber}
              onPress={removeLastDigit}>
              <ArrowLeft width={36} height={36} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.midnightBlack,
  },
  imgEnterPin: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.xxx,
  },
  pinDisplay: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    columnGap: 40,
  },
  pinBox: {
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.pureWhite,
  },
  pinFilled: {
    backgroundColor: colors.pureWhite,
  },
  pinError: {
    borderColor: 'black',
    backgroundColor: 'red',
  },
  buttonContainer: {
    marginTop: 100,
    width: '100%',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xsl,
  },
  boxNumber: {
    width: 40,
    height: 40,
  },
});

export default PinCode;
