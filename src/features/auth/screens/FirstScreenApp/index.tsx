import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import AppButton from '@/components/AppButton';
import {ImageWelcome} from '../../assets/images';

interface FirstScreenProps extends MainStackScreenProps<'FirstScreen'> {}

const FirstScreen: React.FC<FirstScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  return (
    <AppWrapper style={{paddingHorizontal: 16, paddingBottom: 12}}>
      <View style={styles.container}>
        <View style={{flexGrow: 1}}>
          <Image source={ImageWelcome} style={styles.logo} />
          <Text style={styles.textAppName}>Welcome to Crypt0</Text>
          <Text style={styles.textAppInsight}>
            Create a brand new account or add an existing wallet to get started
            easily.
          </Text>
        </View>
        <AppButton
          title="Already have an account?"
          onPress={() => {
            navigation.navigate('LoginScreen', {isGoBackEnable: true});
          }}
        />
        <AppButton
          buttonStyle={styles.button}
          textStyle={{color: '#000'}}
          title="Create a New Account"
          onPress={() => {
            navigation.navigate('CreateNewWalletScreen');
          }}
        />
      </View>
    </AppWrapper>
  );
};

export default FirstScreen;
