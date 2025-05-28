import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppButton, AppHeader, AppWrapper} from '@/components';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {Image} from '@rneui/base';
import {IconDelete, IconQR} from '@/assets/icons';
import AppTextInput from '@/components/AppTextInput';
import {useForm, useWatch} from 'react-hook-form';
import Clipboard from '@react-native-clipboard/clipboard';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {yupResolver} from '@hookform/resolvers/yup';
import {schemaValidate} from './schemaValidate';
import {useAppDispatch} from '@/redux/hooks';
import {importWallet} from '../../redux/slices';

interface PasswordRecoveryScreenProps
  extends MainStackScreenProps<'PasswordRecoveryScreen'> {}

const PasswordRecoveryScreen: React.FC<PasswordRecoveryScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    mode: 'all',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schemaValidate),
  });
  const onSubmit = (body: {password: string}) => {
    dispatch(
      importWallet({
        mnemonic: route.params.mnemonic,
        password: body.password,
      }),
    );
  };
  return (
    <AppWrapper>
      <AppHeader
        title="New Password"
        style={{paddingHorizontal: 16}}
        rightComponent={
          <TouchableOpacity>
            <Image source={IconQR} style={{width: 28, height: 28}} />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
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
      </View>
      <KeyboardAvoidingView behavior="padding">
        <AppButton
          buttonStyle={{
            marginHorizontal: 16,
            marginBottom: 16,
            opacity: isValid ? 1 : 0.6,
          }}
          disable={!isValid}
          title="Confirm"
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};
export default PasswordRecoveryScreen;
