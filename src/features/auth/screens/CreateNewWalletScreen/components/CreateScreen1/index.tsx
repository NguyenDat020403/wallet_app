import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useForm} from 'react-hook-form';
// import {useLazySignUpUserQuery} from '@/features/auth/redux/RTKQuery';
import {
  setAccessInfo,
  setCurrentUserProfile,
  setCurrentWalletIDLocal,
  setSecretLocal,
} from '@/features/auth/redux/slices';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import AppTextInput from '@/components/AppTextInput';
import {schemaValidate} from './schemaValidate';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSignUpUserMutation} from '@/features/auth/redux/RTKQuery';

interface CreateScreen1Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen1: React.FC<CreateScreen1Props> = ({tabIndex}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {accessInfo, currentUser} = useAppSelector(state => state.authReducer);
  // const [signUp] = useLazySignUpUserQuery({});
  const [signUp, {data: dataResponse, isSuccess}] = useSignUpUserMutation();
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

  const ListRequireInfo = [
    {
      title: "Wallet's name",
    },
    {
      title: 'Email',
    },
    {
      title: 'Password',
    },
    {
      title: 'Confirm Password',
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAccessInfo({...dataResponse.data?.token}));
      dispatch(setCurrentUserProfile({...dataResponse.data?.user}));
      dispatch(
        setSecretLocal({...dataResponse.data?.walletDefault.walletSecret!}),
      );
      dispatch(
        setCurrentWalletIDLocal(
          dataResponse.data?.walletDefault.wallet.wallet_id!,
        ),
      );

      tabIndex(1);
    }
  }, [isSuccess]);

  const onContinue = async (data: {
    accountName: string;
    email: string;
    password: string;
  }) => {
    await signUp({
      email: data.email,
      username: data.accountName,
      password: data.password,
    });
  };

  return (
    <AppWrapper style={{paddingHorizontal: 16, paddingBottom: 12}}>
      <View style={styles.container}>
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
        <Text style={[styles.textCap1, {opacity: 0.6}]}>
          Your nickname is stored locally on your device. it will only be
          visible to you.
        </Text>
      </View>
      <AppButton
        buttonStyle={{
          opacity: isValid ? 1 : 0.6,
        }}
        title="Continue"
        disable={!isValid}
        onPress={() => {
          handleSubmit(onContinue)(); // <- gọi hàm
          console.log('da nhan');
        }}
      />
    </AppWrapper>
  );
};

export default CreateScreen1;
