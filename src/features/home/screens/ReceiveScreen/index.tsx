import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppHeader, AppImage, AppTextInput, AppWrapper} from '@/components';
import {TouchableOpacity} from 'react-native';
import {TabView} from '@rneui/base';
import {CryptoTabItem} from '../../components';
import {useForm, useWatch} from 'react-hook-form';
import {IconFind} from '@/assets/icons';

interface ReceiveScreenProps extends MainStackScreenProps<'ReceiveScreen'> {}

const ReceiveScreen: React.FC<ReceiveScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const data = route.params.tokens?.tokens;
  const wallet_id = route.params.tokens?.wallet.wallet_id;

  const handleTabIndex = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };

  const [filteredData, setFilteredData] = useState(data);

  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm<{
    token_symbol: string;
  }>({
    mode: 'all',
    defaultValues: {
      token_symbol: '',
    },
    // resolver: yupResolver(schemaValidate),
  });
  const token_symbol = useWatch({control, name: 'token_symbol'});

  useEffect(() => {
    if (!token_symbol || token_symbol.trim() === '') {
      setFilteredData(data);
      return;
    }

    const keyword = token_symbol.toLowerCase();
    const filtered = data?.filter(item =>
      item.token.symbol.toLowerCase().includes(keyword),
    );
    setFilteredData(filtered);
  }, [token_symbol, data]);

  return (
    <AppWrapper>
      <AppHeader title="Select cryptocurrency" />
      <View style={styles.container}>
        <View style={{padding: 16}}>
          <View style={{position: 'relative'}}>
            <AppTextInput
              key={'token_symbol'}
              type="INPUT"
              placeholder="Search cryptocurrency"
              name="token_symbol"
              style={{paddingLeft: 40}}
              control={control}
            />
            <AppImage
              source={IconFind}
              style={styles.iconFind}
              haveDefault={false}
            />
          </View>
        </View>
        {filteredData ? (
          <CryptoTabItem
            data={filteredData}
            onPress={(network_id, index) => {
              navigation.navigate('ReceiveQRCodeScreen', {
                data: data![index || 0],
                wallet_id: wallet_id!,
              });
            }}
          />
        ) : (
          <></>
        )}
      </View>
    </AppWrapper>
  );
};

export default ReceiveScreen;
