import React, {JSX, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '@/themes/colors';
import {img_logo4, img_onboarding} from '@/assets/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';
import {Text} from 'react-native-svg';

type SplashProps = {
  navigation: NativeStackNavigationProp<RootStackParamsList, 'Splash'>;
};

const Splash = ({navigation}: SplashProps): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('PinCode');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={img_onboarding} style={styles.imageSplash} />
      <Image source={img_logo4} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.midnightBlack,
  },
  image: {
    resizeMode: 'contain',
  },
  imageSplash: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Splash;
