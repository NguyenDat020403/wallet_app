import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppButton from '@/components/AppButton';
import AppWrapper from '@/components/AppWrapper';
import {useForm} from 'react-hook-form';
import AppTextInput from '@/components/AppTextInput';
import AppHeader from '@/components/AppHeader';
import {schemaValidate} from './schemaValidate';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {loginUser} from '../../redux/slices';
import {requestUserPermission} from '@/functions/notification/functions';
import {showToastMessage} from '@/functions';
import {AppDialog} from '@/components';
import {Image} from '@rneui/base';
import {IconFingerprint} from '@/assets/icons';
import {handleSignIn} from './function';
import {goBack} from '@/navigation/RootNavigation';

interface LoginScreenProps extends MainStackScreenProps<'LoginScreen'> {}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const isGoBackEnable = route.params ? true : false;
  const {secretLocal, currentUser, biometricPublicKey} = useAppSelector(
    state => state.authReducer,
  );
  const [isWarning, setIsWarning] = useState(false);
  useEffect(() => {
    console.log('wallets', secretLocal.wallets);
    if (!secretLocal.wallets) {
      showToastMessage('Chưa có ví local');
      setIsWarning(true);
    }
  }, [secretLocal.wallets]);
  console.log(isWarning);
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    email: string;
    password: string;
  }>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
    // resolver: yupResolver(schemaValidate),
  });

  const onSubmit = async (body: {email: string; password: string}) => {
    if (!secretLocal.wallets) {
      setIsWarning(true);
      return;
    }

    dispatch(
      loginUser({
        email: body.email,
        password: body.password,
      }),
    );
  };
  console.log(isGoBackEnable);
  return (
    <AppWrapper>
      <AppHeader
        title="Login"
        onGoBack={() => {
          if (!isGoBackEnable) {
            navigation.navigate('FirstScreen');
          } else {
            goBack();
          }
        }}
      />
      <View style={styles.container}>
        <Text style={styles.textBody2Medium}>Good to see you back!</Text>
        <KeyboardAvoidingView
          behavior="padding"
          style={{flexDirection: 'column', gap: 8, marginTop: 32, flex: 1}}>
          <AppTextInput
            key={'email'}
            title="Email"
            required
            name="email"
            control={control}
          />
          <AppTextInput
            key={'password'}
            title="Password"
            required
            name="password"
            type="PASSWORD"
            control={control}
          />
          <TouchableOpacity
            style={{alignItems: 'flex-start'}}
            onPress={() => {
              navigation.navigate('ImportWalletScreen');
              // navigation.navigate('RecoveryPasswordScreen');
            }}>
            <Text style={styles.textCap1}>Forgot your password?</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <AppButton
              title="Login"
              buttonStyle={{opacity: isValid ? 1 : 0.5, flex: 1}}
              disable={!isValid}
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                handleSignIn();
              }}
              style={{paddingHorizontal: 16, justifyContent: 'center'}}>
              <Image source={IconFingerprint} style={{width: 40, height: 40}} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      <AppDialog
        onPress={() => {
          navigation.navigate('ImportWalletScreen');
        }}
        titleButton="Import Now"
        action="WARNING"
        isVisible={isWarning}
        setIsVisible={setIsWarning}
        title="WARNING"
        desc="Wallet not found on this device. Please import your wallet to continue."
      />
    </AppWrapper>
  );
};

export default LoginScreen;
