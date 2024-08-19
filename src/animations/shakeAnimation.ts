import {Animated} from 'react-native';

export const triggerShake = (shakeAnimation: Animated.Value): void => {
  Animated.sequence([
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: -10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(shakeAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start();
};
