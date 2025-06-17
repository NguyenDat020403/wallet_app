import {View, Text} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
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
  const groupedTokens = route.params.tokens?.groupedTokens;
  const wallet_id = route.params.tokens?.wallet.wallet_id;
  const networkNames = useMemo(
    () => Object.keys(groupedTokens || {}),
    [groupedTokens],
  );

  // Chọn mạng mặc định đầu tiên
  const [selectedNetwork, setSelectedNetwork] = useState<string>(
    networkNames[0] || '',
  );
  return (
    <AppWrapper>
      <AppHeader title="Select cryptocurrency" />
      <View style={styles.container}>
        <CryptoTabItem
          isSearch
          data={groupedTokens}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          isHomeList={false}
          onPress={(network_id, index) => {
            const token =
              groupedTokens[selectedNetwork!]?.tokens[index!] || null;
            if (token) {
              navigation.navigate('ReceiveQRCodeScreen', {
                data: token,
                wallet_id: wallet_id!,
              });
            }
          }}
        />
      </View>
    </AppWrapper>
  );
};

export default ReceiveScreen;
