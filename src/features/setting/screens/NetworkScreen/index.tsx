import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppImage, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useAppSelector} from '@/redux/hooks';
import {useGetNetworkListMutation} from '../../redux/RTKQuery';
import {NetworkItem} from './components';
import AppTextInput from '@/components/AppTextInput';
import {useForm, useWatch} from 'react-hook-form';
import {IconFind, IconSearch} from '@/assets/icons';
import {useFocusEffect} from '@react-navigation/native';

interface NetworkScreenProps extends MainStackScreenProps<'NetworkScreen'> {}

const NetworkScreen: React.FC<NetworkScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const [getNetworkList, {data, isSuccess, isLoading}] =
    useGetNetworkListMutation();
  const {currentWalletID} = useAppSelector(state => state.authReducer);

  const [filteredData, setFilteredData] = useState(data);

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    network: string;
  }>({
    mode: 'all',
    defaultValues: {
      network: '',
    },
    // resolver: yupResolver(schemaValidate),
  });
  const networkValue = useWatch({control, name: 'network'});

  useFocusEffect(
    useCallback(() => {
      getNetworkList({wallet_id: currentWalletID});
    }, []),
  );
  useEffect(() => {
    console.log(data);
  }, [isSuccess]);

  useEffect(() => {
    if (!networkValue || networkValue.trim() === '') {
      setFilteredData(data);
      return;
    }

    const keyword = networkValue.toLowerCase();
    const filtered = data?.filter(item =>
      item.networks.network_name.toLowerCase().includes(keyword),
    );
    setFilteredData(filtered);
  }, [networkValue, data]);

  return (
    <AppWrapper>
      <AppHeader title="Manage Networks" />
      <View style={{padding: 16, flex: 1}}>
        <View style={{position: 'relative'}}>
          <AppTextInput
            key={'network'}
            type="INPUT"
            placeholder="Enter network name or contract address"
            name="network"
            style={{paddingLeft: 40}}
            control={control}
          />
          <AppImage
            source={IconFind}
            style={styles.iconFind}
            haveDefault={false}
          />
        </View>
        {data ? (
          <FlatList
            style={{paddingVertical: 16, flex: 1}}
            data={filteredData}
            renderItem={({item}) => {
              return <NetworkItem data={item.networks} />;
            }}
          />
        ) : (
          <></>
        )}
      </View>
      <AppButton
        title="Add new network"
        buttonStyle={{margin: 16}}
        onPress={() => {
          navigation.navigate('AddNetworkScreen', {});
        }}
      />
    </AppWrapper>
  );
};

export default NetworkScreen;
