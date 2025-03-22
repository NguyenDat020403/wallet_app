import React from 'react';
import {TextInput, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {useForm} from 'react-hook-form';

interface CreateScreen1Props {
  tabIndex: (newTabIndex: number) => void;
}

const CreateScreen1: React.FC<CreateScreen1Props> = ({tabIndex}) => {
  const styles = useStyles();

  const {control, setValue, watch} = useForm<{
    accountName: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      accountName: '',
    },
  });
  const accountName = watch('accountName');

  return (
    <AppWrapper style={{paddingHorizontal: 16, paddingBottom: 12}}>
      <View style={styles.container}>
        <Text style={styles.textBody3Regular}>Name Your Wallet</Text>
        <Text style={[styles.textBody3Regular, {opacity: 0.6}]}>
          Choose a nickname for your wallet
        </Text>
        <TextInput
          value={accountName}
          onChangeText={text =>
            setValue('accountName', text, {shouldValidate: true})
          }
          style={[styles.textBody2Medium]}
          placeholderTextColor={'#575757'}
          placeholder="My New Wallet"
        />
        <Text style={[styles.textCap1, {opacity: 0.6}]}>
          Your nickname is stored locally on your device. it will only be
          visible to you.
        </Text>
      </View>
      <AppButton
        buttonStyle={{
          opacity: accountName ? 1 : 0.6,
        }}
        title="Continue"
        disable={!accountName}
        onPress={() => {
          tabIndex(1);
        }}
      />
    </AppWrapper>
  );
};

export default CreateScreen1;
