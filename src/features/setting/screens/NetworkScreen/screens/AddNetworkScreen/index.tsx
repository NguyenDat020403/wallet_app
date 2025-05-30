import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {AppButton, AppTextInput, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {IconInfoCircle} from '@/assets/icons';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {useForm} from 'react-hook-form';
import {createNetwork} from '@/features/setting/redux/slices';

interface AddNetworkScreenProps
  extends MainStackScreenProps<'AddNetworkScreen'> {}

const AddNetworkScreen: React.FC<AddNetworkScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const dispatch = useAppDispatch();
  const {network, isEnableEdit} = route.params;
  const {secretLocal, accessInfo, currentWalletID} = useAppSelector(
    state => state.authReducer,
  );
  const [isTestnet, setIsTestnet] = useState(
    isEnableEdit ? isEnableEdit : false,
  );
  console.log(currentWalletID);
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    networkName: string;
    rpc_url: string;
    chain_id: string;
    symbol: string;
    explorer_url: string;
  }>({
    mode: 'all',
    defaultValues: {
      networkName: '',
      rpc_url: '',
      chain_id: '',
      symbol: '',
      explorer_url: '',
    },
    // resolver: yupResolver(schemaValidate),
  });
  const onSubmit = (body: {
    networkName: string;
    rpc_url: string;
    chain_id: string;
    symbol: string;
    explorer_url: string;
  }) => {
    dispatch(
      createNetwork({
        network_name: body.networkName,
        rpc_url: body.rpc_url,
        chain_id: body.chain_id,
        symbol: body.symbol,
        block_explorer_url: body.explorer_url,
        wallet_network_address:
          body.chain_id === '1'
            ? secretLocal.wallets![1].address
            : secretLocal.wallets![0].address,
        is_testnet: isTestnet,
      }),
    );
  };

  return (
    <AppWrapper>
      <AppHeader title="Add Network" />
      <View style={styles.container}>
        {!isEnableEdit && (
          <View style={styles.warning}>
            <Image source={IconInfoCircle} style={styles.icon} />
            <Text style={[styles.textCap, {color: '#B3B3B3', flex: 1}]}>
              Unverified internet providers may expose false blockchain data and
              track your network activity. Only proceed if you fully trust the
              network.
            </Text>
          </View>
        )}
        <AppTextInput
          key={'networkName'}
          type="INPUT"
          editable={!isEnableEdit}
          required={isEnableEdit ? false : true}
          placeholder={isEnableEdit ? network?.network_name : 'Ex: Ethereum'}
          title="Network name"
          name="networkName"
          control={control}
        />
        <AppTextInput
          key={'rpc_url'}
          type="INPUT"
          editable={!isEnableEdit}
          required={isEnableEdit ? false : true}
          placeholder={
            isEnableEdit ? network?.rpc_url : 'Ex: https://example.com'
          }
          numberOfLines={1}
          title="URL RPC"
          name="rpc_url"
          control={control}
        />
        <AppTextInput
          key={'chain_id'}
          type="INPUT"
          editable={!isEnableEdit}
          required={isEnableEdit ? false : true}
          placeholder={isEnableEdit ? network?.chain_id : 'Ex: 0'}
          title="Chain ID"
          name="chain_id"
          control={control}
        />
        <AppTextInput
          key={'symbol'}
          type="INPUT"
          placeholder={isEnableEdit ? network?.symbol : 'Ex: ETH'}
          editable={!isEnableEdit}
          required={isEnableEdit ? false : true}
          title="Symbol"
          name="symbol"
          control={control}
        />
        <AppTextInput
          key={'explorer_url'}
          type="INPUT"
          title="Explorer blockchain"
          editable={!isEnableEdit}
          placeholder={
            isEnableEdit
              ? network?.block_explorer_url
              : 'Ex: https://ethereum.org'
          }
          name="explorer_url"
          control={control}
        />
        <View style={{flexDirection: 'row', gap: 12, marginTop: 8}}>
          <Text style={styles.textRegular}>It's testnet?</Text>
          <TouchableOpacity
            disabled={isEnableEdit}
            onPress={() => {
              setIsTestnet(!isTestnet);
            }}
            style={[
              styles.boxTestnet,
              {
                borderColor: isTestnet ? '#804FB0' : '#FFF',
              },
            ]}>
            {isTestnet && <View style={styles.testnetFirmed} />}
          </TouchableOpacity>
        </View>
      </View>
      {!isEnableEdit && (
        <AppButton
          title="Confirm"
          buttonStyle={{margin: 16}}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        />
      )}
    </AppWrapper>
  );
};

export default AddNetworkScreen;
