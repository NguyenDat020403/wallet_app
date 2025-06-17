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
import {GroupedTokens, Tokens} from '../../redux/RTKQuery/types';

interface SendScreenProps extends MainStackScreenProps<'SendScreen'> {}

const SendScreen: React.FC<SendScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const groupedTokens: GroupedTokens = route.params.listCoin;
  const filteredGroupedTokens = useMemo(() => {
    const result: GroupedTokens = {};

    Object.entries(groupedTokens).forEach(([networkName, networkData]) => {
      const filteredTokens = networkData.tokens.filter(
        token => parseFloat(token.balance) > 0,
      );

      if (filteredTokens.length > 0) {
        result[networkName] = {
          ...networkData,
          tokens: filteredTokens,
        };
      }
    });

    return result;
  }, [groupedTokens]);

  const networkNames = useMemo(
    () => Object.keys(groupedTokens || {}),
    [groupedTokens],
  );

  const [selectedNetwork, setSelectedNetwork] = useState<string>(
    networkNames[0] || '',
  );

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader title="Send" />
        {filteredGroupedTokens ? (
          <CryptoTabItem
            isSearch
            data={filteredGroupedTokens}
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
            isHomeList={false}
            onPress={(network_id, index) => {
              const token =
                filteredGroupedTokens[selectedNetwork!]?.tokens[index!] || null;
              if (token) {
                navigation.navigate('CoinDetailScreen', {token});
              }
            }}
          />
        ) : (
          <Text style={styles.textBody1Regular}>
            Your wallet has no tokens available for sending.
          </Text>
        )}
      </View>
    </AppWrapper>
  );
};

export default SendScreen;
