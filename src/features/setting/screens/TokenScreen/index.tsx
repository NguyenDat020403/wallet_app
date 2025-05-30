import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {
  AppBottomSheetModal,
  AppButton,
  AppImage,
  AppWrapper,
} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useAppSelector} from '@/redux/hooks';
import {useGetNetworkListMutation} from '../../redux/RTKQuery';
import AppTextInput from '@/components/AppTextInput';
import {useForm} from 'react-hook-form';
import {IconFind, IconSearch} from '@/assets/icons';
import {useFocusEffect} from '@react-navigation/native';
import {NetworkItem} from '../NetworkScreen/components';
import {Icon, Image} from '@rneui/base';
import {schemaValidate} from './schemaValidate';
import {yupResolver} from '@hookform/resolvers/yup';
import {goBack} from '@/navigation/RootNavigation';

interface TokenScreenProps extends MainStackScreenProps<'TokenScreen'> {}

const TokenScreen: React.FC<TokenScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const [getNetworkList, {data, isSuccess, isLoading}] =
    useGetNetworkListMutation();
  const {currentUser} = useAppSelector(state => state.authReducer);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(data && data[0]);

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    contract_address: string;
    symbol: string;
    decimal: string;
  }>({
    mode: 'all',
    defaultValues: {
      contract_address: '',
      symbol: '',
      decimal: '',
    },
    resolver: yupResolver(schemaValidate),
  });

  const onSubmit = (body: {
    contract_address: string;
    symbol: string;
    decimal: string;
  }) => {
    //create Token
  };

  useFocusEffect(
    useCallback(() => {
      getNetworkList({});
    }, []),
  );
  useEffect(() => {
    if (data) {
      setSelectedNetwork(data[0]);
    }
  }, [data]);
  return (
    <AppWrapper>
      <AppHeader title="Custom crypto asset" />
      <View style={{padding: 16, flex: 1}}>
        <Text style={[styles.textRegular, {marginVertical: 8}]}>Network</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.networkBox}
          onPress={() => {
            setIsVisible(true);
          }}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <AppImage
              source={{uri: selectedNetwork && selectedNetwork.thumbnail}}
              style={{width: 24, height: 24, borderRadius: 150}}
            />
            <Text style={styles.textRegular}>
              {selectedNetwork && selectedNetwork.network_name}
            </Text>
          </View>
          <Icon
            type="feather"
            name="chevron-down"
            color={'#FFFFFF'}
            iconStyle={{fontSize: 16}}
          />
        </TouchableOpacity>
        <AppTextInput
          title="Contract address"
          key={'contract_address'}
          type="INPUT"
          required
          placeholder="Enter contract address"
          name="contract_address"
          control={control}
        />
        <AppTextInput
          title="Symbol"
          key={'symbol'}
          type="INPUT"
          required
          placeholder="Enter symbol"
          name="symbol"
          control={control}
        />
        <AppTextInput
          title="Decimal"
          key={'decimal'}
          type="INPUT"
          required
          placeholder="Enter decimal"
          name="decimal"
          control={control}
        />
      </View>
      <AppBottomSheetModal isVisible={isVisible} setIsVisible={setIsVisible}>
        <Text
          style={[
            styles.textMedium,
            {textAlign: 'center', paddingTop: 12, paddingBottom: 24},
          ]}>
          Select Blockchain Network
        </Text>
        <FlatList
          data={data}
          contentContainerStyle={{gap: 24}}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  setSelectedNetwork(item);
                }}
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',
                }}>
                <AppImage
                  source={{uri: item.thumbnail}}
                  style={{width: 40, height: 40, borderRadius: 150}}
                />
                <Text style={styles.textRegular}>{item.network_name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </AppBottomSheetModal>
      <AppButton
        title="Confirm"
        buttonStyle={{margin: 16}}
        onPress={() => {
          handleSubmit(onSubmit)();
          goBack();
          //   navigation.navigate('AddNetworkScreen', {});
        }}
      />
    </AppWrapper>
  );
};

export default TokenScreen;
