import React from 'react';
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

interface LoginScreenProps extends MainStackScreenProps<'LoginScreen'> {}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

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
    resolver: yupResolver(schemaValidate),
  });

  const onSubmit = async (body: {email: string; password: string}) => {
    dispatch(
      loginUser({
        email: body.email,
        password: body.password,
      }),
    );
  };

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader title="Login" />
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
            style={{alignItems: 'flex-end'}}
            onPress={() => {
              navigation.navigate('ImportWalletScreen');
              // navigation.navigate('RecoveryPasswordScreen');
            }}>
            <Text style={styles.textCap1}>Forgot your password?</Text>
          </TouchableOpacity>
          <AppButton
            title="Login"
            buttonStyle={{opacity: isValid ? 1 : 0.5}}
            disable={!isValid}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </AppWrapper>
  );
};

export default LoginScreen;
