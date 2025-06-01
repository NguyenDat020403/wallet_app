import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, TextInput, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useForm} from 'react-hook-form';
import {
  setAccessInfo,
  setCurrentUserProfile,
  setCurrentWalletIDLocal,
  setIsAuthenticated,
  setSecretLocal,
  signUpUser,
} from '@/features/auth/redux/slices';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import AppTextInput from '@/components/AppTextInput';
import {schemaValidate} from './schemaValidate';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSignUpUserMutation} from '@/features/auth/redux/RTKQuery';
import AppCarousel from '@/components/AppCarousel';
import {ListIconAnimation} from './types';
import {Image} from '@rneui/base';
import {ImageWallet} from '@/assets/images';
import {TouchableOpacity} from 'react-native';
import {IconFingerprint} from '@/assets/icons';
import {generateBiometricKeyForSignup, resetBiometricKeys} from './function';
import {launchImageLibrary} from 'react-native-image-picker';
interface CreateScreen1Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen1: React.FC<CreateScreen1Props> = ({tabIndex}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {biometricPublicKey} = useAppSelector(state => state.authReducer);
  const [signUp, {data: dataResponse, isSuccess, isError}] =
    useSignUpUserMutation();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    accountName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    mode: 'all',
    defaultValues: {
      accountName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schemaValidate),
  });
  const onContinue = (data: {
    accountName: string;
    email: string;
    password: string;
  }) => {
    dispatch(
      signUpUser({
        email: data.email,
        username: data.accountName,
        password: data.password,
        biometricPublicKey: biometricPublicKey,
        callback: () => {
          tabIndex(1);
        },
      }),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          {/* <Image
      source={ImageWallet}
      style={{
        width: 400,
        height: 400,
      }}
      containerStyle={{
        position: 'absolute',
        zIndex: -1,
        top: 0,
        opacity: 0.1,
      }}
    /> */}
          <AppTextInput
            key={'accountName'}
            title="Name"
            required
            name="accountName"
            control={control}
          />
          <AppTextInput title="Email" required name="email" control={control} />
          <AppTextInput
            key={'password'}
            type="PASSWORD"
            title="Password"
            required
            name="password"
            control={control}
          />
          <AppTextInput
            key={'confirmPassword'}
            type="PASSWORD"
            title="Confirm Password"
            required
            name="confirmPassword"
            control={control}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16,
            }}>
            <Text style={[styles.textCap1, {color: '#B3B3B3'}]}>
              Sign your finger-print for more save
            </Text>
            <TouchableOpacity
              onPress={async () => {
                await generateBiometricKeyForSignup();
              }}
              style={{paddingHorizontal: 16, justifyContent: 'center'}}>
              <Image source={IconFingerprint} style={{width: 40, height: 40}} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AppCarousel data={ListIconAnimation} />
      </View>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60}>
        <AppButton
          buttonStyle={{
            opacity: isValid ? 1 : 0.6,
            margin: 16,
          }}
          title="Continue"
          disable={!isValid}
          onPress={() => {
            handleSubmit(onContinue)();
          }}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateScreen1;
