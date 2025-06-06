import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {
  AppBottomSheetModal,
  AppButton,
  AppHeader,
  AppImage,
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
  useGetWalletListTokenMutation,
  useUpdateWalletNameMutation,
} from '../../redux/RTKQuery';
import {hideAppLoading, showAppLoading} from '@/features/common/functions';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {setCurrentWalletIDLocal} from '@/features/auth/redux/slices';
import {setUserWallets} from '../../redux/slices';
import {IconCopy} from '@/features/auth/assets/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToastMessage} from '@/functions';
import {ListWalletToken} from '../../redux/RTKQuery/types';
import {IconFind} from '@/assets/icons';

interface WalletAddressScreenProps
  extends MainStackScreenProps<'WalletAddressScreen'> {}

const WalletAddressScreen: React.FC<WalletAddressScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const wallet_id = route.params.wallet_id;

  const {userWallet} = useAppSelector(state => state.homeReducer);
  const {secretLocal, currentWalletID} = useAppSelector(
    state => state.authReducer,
  );

  const [getData, {data}] = useGetWalletListTokenMutation();

  const walletSecret = secretLocal.find(item => item.wallet_id === wallet_id);
  const walletAddresses = walletSecret?.wallets;
  const [filteredData, setFilteredData] = useState<ListWalletToken[]>();

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    network_name: string;
  }>({
    mode: 'all',
    defaultValues: {
      network_name: '',
    },
    // resolver: yupResolver(schemaValidate),
  });
  const networkName = useWatch({control, name: 'network_name'});

  useEffect(() => {
    getData({wallet_id: wallet_id});
  }, []);

  useEffect(() => {
    if (!networkName || networkName.trim() === '') {
      setFilteredData(data);
      return;
    }

    const keyword = networkName.toLowerCase();
    const filtered = data?.filter(item =>
      item.networks.network_name.toLowerCase().includes(keyword),
    );
    setFilteredData(filtered);
  }, [networkName, data]);

  return (
    <AppWrapper>
      <AppHeader title="Wallet" />
      <View style={styles.container}>
        <View style={{position: 'relative', marginBottom: 16}}>
          <AppTextInput
            key={'network_name'}
            type="INPUT"
            placeholder="Enter network name or contract address"
            name="network_name"
            style={{paddingLeft: 40}}
            control={control}
          />
          <AppImage
            source={IconFind}
            style={{
              width: 24,
              height: 24,
              position: 'absolute',
              top: 24,
              left: 12,
            }}
            haveDefault={false}
          />
        </View>
        {filteredData &&
          filteredData.map(item => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 24,
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                  <AppImage
                    source={{uri: item.networks.thumbnail || ''}}
                    style={{width: 40, height: 40, borderRadius: 150}}
                  />
                  <View style={{gap: 6}}>
                    <Text style={styles.textBody2Medium}>
                      {item.networks.network_name}
                    </Text>
                    <Text style={styles.textCap1} numberOfLines={1}>
                      {item.address}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    await Clipboard.setString(item.address);
                    showToastMessage('Copied');
                  }}>
                  <AppImage
                    haveDefault={false}
                    source={IconCopy}
                    style={{width: 24, height: 24}}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </AppWrapper>
  );
};

export default WalletAddressScreen;
