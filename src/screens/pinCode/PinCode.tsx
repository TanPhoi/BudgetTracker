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
import {getPin, setPin} from '@/services/firebaseService';
import {triggerShake} from '@/animations/shakeAnimation';

type PinCodeProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'PinCode'>;
};

const PinCode = ({navigation}: PinCodeProps): JSX.Element => {
  const [pin, setPinState] = useState<string>('');
  const [storedPin, setStoredPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getPin().then(pin => setStoredPin(pin));
  }, []);

  const handlePress = (value: string): void => {
    if (pin.length < 4) {
      setPinState(prevPin => prevPin + value);
    }
  };

  const handleSubmit = (): void => {
    if (!storedPin && pin.length === 4) {
      setPin(pin).then(() => {
        navigation.navigate('TabNavigation');
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
        navigation.navigate('TabNavigation');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={img_enter_pin} style={styles.imgEnterPin}>
        <Text style={styles.title}>Enter Pin</Text>
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

            <TouchableOpacity style={styles.boxNumber} onPress={handleSubmit}>
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
    marginBottom: spacing.s90,
    color: colors.pureWhite,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Syne',
    letterSpacing: 0.36,
  },
  pinDisplay: {
    flexDirection: 'row',
    marginBottom: spacing.s20,
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
    marginBottom: spacing.s46,
  },
  boxNumber: {
    width: 40,
    height: 40,
  },
});

export default PinCode;
