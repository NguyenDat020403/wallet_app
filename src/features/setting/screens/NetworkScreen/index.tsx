import React, {useEffect} from 'react';
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
import {useForm} from 'react-hook-form';
import {IconFind, IconSearch} from '@/assets/icons';

interface NetworkScreenProps extends MainStackScreenProps<'NetworkScreen'> {}

const NetworkScreen: React.FC<NetworkScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const [getNetworkList, {data, isSuccess, isLoading}] =
    useGetNetworkListMutation();
  const {currentUser} = useAppSelector(state => state.authReducer);
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
  useEffect(() => {
    getNetworkList({});
  }, []);
  useEffect(() => {
    console.log(data);
  }, [isSuccess]);
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
        {data ? (
          <FlatList
            style={{paddingVertical: 16, flex: 1}}
            data={data}
            renderItem={({item}) => {
              return <NetworkItem data={item} />;
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
          navigation.navigate('AddNetworkScreen');
        }}
      />
    </AppWrapper>
  );
};

export default NetworkScreen;
