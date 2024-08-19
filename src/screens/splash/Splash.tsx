import React, {JSX, useEffect} from 'react';
import {ImageBackground, Image, StyleSheet, View} from 'react-native';
import {colors} from '@/themes/colors';
import {img_logo4, img_onboarding} from '@/assets/images';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/routers/AppNavigation';

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
    <ImageBackground source={img_onboarding} style={styles.imageSplash}>
      <Image source={img_logo4} style={styles.image} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageSplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.midnightBlack,
  },
  image: {
    resizeMode: 'contain',
  },
});

export default Splash;
