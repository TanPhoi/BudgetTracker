import {BackIcon, DotsVertical} from '@/assets/svg';
import {typography} from '@/themes/typography';
import React, {JSX} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type HeaderProps = {
  label: string;
  onPress: () => void;
};

const Header = ({label, onPress}: HeaderProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={typography.Heading1}>{label}</Text>
      <DotsVertical />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default Header;
