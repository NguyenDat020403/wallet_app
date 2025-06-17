import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {
  AppBottomSheetModal,
  AppButton,
  AppHeader,
  AppTextInput,
  AppWrapper,
} from '@/components';
import {TouchableOpacity} from 'react-native';
import {Icon, TabView} from '@rneui/base';
import {CryptoTabItem} from '../../components';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';
import {
  useDeleteWalletNameMutation,
  useUpdateWalletNameMutation,
} from '../../redux/RTKQuery';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {setCurrentWalletIDLocal} from '@/features/auth/redux/slices';
import {setIsChangeWalletName, setUserWallets} from '../../redux/slices';
import {goBack} from '@/navigation/RootNavigation';

interface WalletScreenProps extends MainStackScreenProps<'WalletScreen'> {}

const WalletScreen: React.FC<WalletScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {userWallet} = useAppSelector(state => state.homeReducer);
  const {secretLocal, currentWalletID} = useAppSelector(
    state => state.authReducer,
  );

  const [updateWalletName, {data, isSuccess}] = useUpdateWalletNameMutation();
  const [
    deletedWallet,
    {data: dataWalletDeleted, isSuccess: isDeletedSuccess},
  ] = useDeleteWalletNameMutation();

  const [wallet, setDataWallet] = useState(route.params.wallet);
  const [isVisible, setIsVisible] = useState(false);
  const [isCanDelete, setIsCanDelete] = useState(userWallet.length > 1);
  const {
    control,
    handleSubmit,
    reset,
    formState: {isValid},
  } = useForm<{
    wallet_name: string;
  }>({
    mode: 'all',
    defaultValues: {
      wallet_name: wallet.wallet_name,
    },
    // resolver: yupResolver(schemaValidate),
  });
  const walletName = useWatch({control, name: 'wallet_name'});
  const isMaxLength = walletName.length > 25;
  useEffect(() => {
    if (isVisible) {
      reset({
        wallet_name: wallet.wallet_name,
      });
    }
  }, [isVisible]);

  const onConfirm = () => {
    updateWalletName({wallet_id: wallet.wallet_id, wallet_name: walletName});
    dispatch(setIsChangeWalletName(true));
    showAppLoading();
  };
  const onDelete = () => {
    deletedWallet({wallet_id: wallet.wallet_id});
    showAppLoading();
  };
  useEffect(() => {
    if (isSuccess) {
      hideAppLoading();
      setIsVisible(false);
      setDataWallet(data);
    }
    if (isDeletedSuccess) {
      hideAppLoading();
      if (userWallet.length === 1) {
      }
      const wallet_existed = userWallet.filter(
        item => item.wallet_id !== wallet.wallet_id,
      );
      dispatch(setCurrentWalletIDLocal(wallet_existed[0].wallet_id));
      dispatch(setUserWallets(wallet_existed));

      navigation.replace('AppTabScreen');
    }
  }, [isSuccess, isDeletedSuccess]);

  const ListAction = [
    {
      title: 'Wallet Addresses',
      iconName: 'list',
      onPress: () => {
        navigation.navigate('WalletAddressScreen', {
          wallet_id: wallet.wallet_id,
        });
      },
    },
    {
      title: 'Icloud Backup',
      iconName: 'upload-cloud',
      onPress: () => {
        console.log('Icloud Backup');
      },
    },
    {
      title: 'Seed Phrase',
      iconName: 'key',
      onPress: () => {
        navigation.navigate('RecoveryPhraseScreen', {
          callBack: () => {
            goBack();
          },
        });
      },
    },
  ];

  return (
    <AppWrapper>
      <AppHeader title="Wallet" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
          style={styles.flexRow}>
          <Text style={styles.textBody3Bold}>{wallet.wallet_name}</Text>
          <Icon
            type="feather"
            name="edit"
            color={'#000'}
            iconStyle={{fontSize: 20}}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
        <Text style={[styles.textBody3Bold, {paddingVertical: 16}]}>
          Backups
        </Text>
        <View>
          {ListAction.map(item => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 16,
                }}
                onPress={item.onPress}>
                <View style={{flexDirection: 'row', gap: 12}}>
                  <Icon
                    type="feather"
                    name={item.iconName}
                    color={'#000'}
                    iconStyle={{fontSize: 20}}
                  />
                  <Text style={styles.textBody1Regular}>{item.title}</Text>
                </View>
                <Icon
                  type="feather"
                  name="chevron-right"
                  color={'#000'}
                  iconStyle={{fontSize: 16}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.divider} />
      </View>
      <AppButton
        onPress={() => {
          onDelete();
        }}
        title="Delete"
        disable={!isCanDelete}
        buttonStyle={{
          opacity: !isCanDelete ? 0.6 : 1,
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      />
      <AppBottomSheetModal
        autoSize
        isVisible={isVisible}
        setIsVisible={setIsVisible}>
        <View style={{padding: 16}}>
          <Text style={[styles.textBody2Medium, {marginBottom: 16}]}>
            Change wallet name
          </Text>
          <Text style={styles.textBody1Regular}>Wallet name</Text>
          <Controller
            control={control}
            name={'wallet_name'}
            render={({field: {onChange, value}, fieldState: {error}}) => {
              return (
                <BottomSheetTextInput
                  value={value}
                  onChangeText={onChange}
                  key={'wallet_name'}
                  defaultValue={wallet.wallet_name}
                  style={[styles.textBody1Regular, styles.inputStyle]}
                />
              );
            }}
          />

          <Text
            style={[styles.textCap1, {color: isMaxLength ? 'red' : '#333333'}]}>
            {walletName && walletName.length}/25
          </Text>
          <AppButton
            onPress={() => {
              onConfirm();
            }}
            disable={wallet.wallet_name === walletName || isMaxLength}
            title="Confirm"
            buttonStyle={{
              marginVertical: 24,
              opacity:
                isMaxLength || wallet.wallet_name === walletName ? 0.6 : 1,
            }}
          />
        </View>
      </AppBottomSheetModal>
    </AppWrapper>
  );
};

export default WalletScreen;
