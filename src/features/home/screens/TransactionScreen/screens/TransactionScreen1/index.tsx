import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import AppTextInput from '@/components/AppTextInput';
import {useForm} from 'react-hook-form';
import Clipboard from '@react-native-clipboard/clipboard';
import {IconCopy} from '@/features/auth/assets/icons';
import {IconClose, IconDelete, IconInfoCircle, IconTrash} from '@/assets/icons';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {WalletAddress} from '@/assets/images';
import {Image} from '@rneui/base';
import {ListHistoryTransactionDemo} from './types';
import {AppButton, AppListLoading} from '@/components';
import {yupResolver} from '@hookform/resolvers/yup';
import {schemaValidate} from './schemaValidate';
import {Tokens} from '@/features/home/redux/RTKQuery/types';
import {useGetSendTransactionToAddressHistoryMutation} from '@/features/home/redux/RTKQuery';
import {useAppSelector} from '@/redux/hooks';
import {showToastMessage} from '@/functions';

type TransactionScreen1Props = {
  receiveAddress?: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setTabIndex: React.Dispatch<React.SetStateAction<number>>;
  token: Tokens;
};

const TransactionScreen1: React.FC<TransactionScreen1Props> = ({
  setAddress,
  setTabIndex,
  token,
  receiveAddress,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {secretLocal, currentWalletID} = useAppSelector(
    state => state.authReducer,
  );
  const [getListHistoryAddress, {data, isLoading}] =
    useGetSendTransactionToAddressHistoryMutation();
  const walletSecret = secretLocal.find(w => w.wallet_id === currentWalletID);

  useEffect(() => {
    const address =
      token.network.chain_id === '0'
        ? walletSecret!.wallets![1].address
        : walletSecret!.wallets![0].address;
    getListHistoryAddress({
      address: address,
      chain_id: token.network.chain_id,
      decimals: token.token.decimals.toString(),
    });
  }, []);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {isValid},
  } = useForm<{
    address: string;
  }>({
    mode: 'all',
    defaultValues: {
      address: receiveAddress ? receiveAddress : '',
    },
    resolver: yupResolver(schemaValidate),
  });

  useEffect(() => {
    if (receiveAddress) {
      const isValidEthAddress = /^0x[a-fA-F0-9]{40}$/.test(receiveAddress);

      if (token.network.chain_id !== '0' && !isValidEthAddress) {
        showToastMessage('Please check the token & address');
      } else {
        setValue('address', receiveAddress, {shouldValidate: true});
      }
    }
  }, [receiveAddress]);

  const [isPressPaste, setIsPressPaste] = useState(false);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setIsPressPaste(!isPressPaste);
    if (!isPressPaste) {
      setValue('address', text, {shouldValidate: true});
    } else {
      setValue('address', '', {shouldValidate: true});
    }
  };

  const handleSetValue = (value: string) => {
    setValue('address', value, {shouldValidate: true});
    setIsPressPaste(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textHeading2}>Receiving Address</Text>
        <AppTextInput
          style={{height: 50}}
          isShowError={false}
          hitSlop={100}
          type="INPUT"
          key={'address'}
          name={'address'}
          control={control}
          placeholder="To: address"
          placeholderTextColor="#FFFFFF03"
        />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={fetchCopiedText}
          style={styles.boxPaste}>
          <Image
            source={!isPressPaste ? IconCopy : IconClose}
            style={{width: 20, height: 20}}
          />
          <Text style={styles.textBody1Regular}>
            {!isPressPaste ? 'Paste' : 'Clear'}
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <Text style={styles.textBody1Regular}>History</Text>
        <FlatList
          style={{marginVertical: 16}}
          data={data}
          contentContainerStyle={{gap: 12}}
          ListEmptyComponent={
            isLoading ? (
              <AppListLoading isLoading={isLoading} />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 6,
                  justifyContent: 'center',
                }}>
                <Text style={styles.textBody1Regular}>
                  Not found any transaction
                </Text>
                <Image
                  source={IconInfoCircle}
                  style={{width: 16, height: 16}}
                  containerStyle={{alignSelf: 'center'}}
                />
              </View>
            )
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{flexDirection: 'row', gap: 12}}
                onPress={() => {
                  handleSetValue(item);
                }}>
                <Image
                  source={WalletAddress}
                  style={{width: 40, height: 40}}
                  containerStyle={{borderRadius: 8}}
                />
                <View>
                  {/* <Text
                    numberOfLines={1}
                    style={[
                      styles.textBody1Regular,
                      {
                        maxWidth:
                          (safeAreaInsets.screenWidth - 32 - 40 - 12) / 2,
                      },
                    ]}>
                    {item.name}
                  </Text> */}
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.textBody1Regular,
                      {maxWidth: safeAreaInsets.screenWidth - 32 - 40 - 12},
                    ]}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={
            safeAreaInsets.bottom + safeAreaInsets.top + 16
          }>
          <AppButton
            buttonStyle={{marginBottom: 16, opacity: !isValid ? 0.6 : 1}}
            disable={!isValid}
            title="Confirm"
            onPress={() => {
              setAddress(getValues('address'));
              setTabIndex(1);
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default TransactionScreen1;
