import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {AppLogo} from '@/assets/icons';
import AppButton from '@/components/AppButton';
import {ImageWelcome} from '../../assets/images';

interface FirstScreenProps extends MainStackScreenProps<'FirstScreen'> {}

const FirstScreen: React.FC<FirstScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  return (
    <AppWrapper style={{paddingHorizontal: 16, paddingBottom: 12}}>
      <View style={styles.container}>
        <Image source={ImageWelcome} style={styles.logo} />
        <Text style={styles.textAppName}>Welcome to Crypt0</Text>
        <Text style={styles.textAppInsight}>
          Create a brand new wallet or add an existing one to get started
          easily.
        </Text>
      </View>
      <AppButton
        title="Create a New Wallet"
        onPress={() => {
          navigation.navigate('CreateNewWalletScreen');
        }}
      />
      <AppButton
        textStyle={{color: '#FFFFFF'}}
        title="Add an Existing Wallet"
        buttonStyle={styles.button}
        onPress={() => {
          // navigation.navigate('LoginScreen');
        }}
      />
    </AppWrapper>
  );
};

export default FirstScreen;
