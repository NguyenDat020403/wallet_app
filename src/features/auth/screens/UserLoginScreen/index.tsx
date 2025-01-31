import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Pressable, TextInput, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {IconEyeOff, IconEyeOn} from '@/assets/icons';
import AppButton from '@/components/AppButton';
import {goBack, navigate} from '@/navigation/RootNavigation';
import AppWrapper from '@/components/AppWrapper';
import BackgroundAuthentication from '../components/BackgroundAuth';
import {useLazyLoginUserQuery} from '../../redux/RTKQuery';

interface LoginScreenProps extends MainStackScreenProps<'LoginScreen'> {}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [
    loginUserEmailPassword,
    {data, isSuccess, isFetching, isLoading, isError},
  ] = useLazyLoginUserQuery();
  const handleLogin = async () => {
    try {
      const result = await loginUserEmailPassword({
        email: 'trinhdattest@gmail.com',
        password: '123123',
      });

      if ('data' in result) {
        console.log('Login Success:', result.data);
      } else {
        console.error('Login Failed:', result.error);
      }
    } catch (err) {
      console.error('Unexpected Error:', err);
    }
  };
  if (isLoading) {
    console.log('Loading...');
  }
  if (isSuccess) {
    console.log(data.token);
    goBack();
  }
  if (isError) {
    console.log('Error...');
  }

  return (
    <AppWrapper style={styles.container}>
      <BackgroundAuthentication />
      <View style={{paddingHorizontal: 16}}>
        <Text style={styles.textTitle}>Login</Text>
        <Text style={styles.textDesc}>Good to see you back!</Text>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flexDirection: 'column', gap: 8, marginTop: 32}}>
        <TextInput
          placeholder="Email/Phone"
          style={styles.textInput}
          placeholderTextColor={'#D2D2D2'}
        />
        <View style={{position: 'relative', justifyContent: 'center'}}>
          <TextInput
            secureTextEntry={!isShowPassword}
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor={'#D2D2D2'}
          />
          <Image
            onPress={() => {
              setIsShowPassword(!isShowPassword);
            }}
            source={isShowPassword ? IconEyeOn : IconEyeOff}
            style={{width: 16, height: 16}}
            containerStyle={{
              position: 'absolute',
              right: 32,
            }}
          />
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('RecoveryPasswordScreen');
          }}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </Pressable>
        <AppButton
          title="Login"
          onPress={() => {
            handleLogin();
          }}
          buttonStyle={{marginTop: 32}}
        />
        <AppButton
          onPress={() => {
            goBack();
          }}
          title="Cancel"
          buttonStyle={{backgroundColor: '#FFFFFF'}}
          textStyle={{color: '#202020', fontSize: 15}}
        />
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default LoginScreen;
