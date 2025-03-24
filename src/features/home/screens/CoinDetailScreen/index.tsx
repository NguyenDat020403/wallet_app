import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {ActionItem} from '../HomeScreen';
import {IconBuy, IconReceive, IconSend, IconSwap} from '@/assets/icons';
import AppHeader from '@/components/AppHeader';
import {Image} from '@rneui/base';
import {ImageAvatar} from '@/features/auth/assets/images';

interface CoinDetailScreenProps
  extends MainStackScreenProps<'CoinDetailScreen'> {}

const CoinDetailScreen: React.FC<CoinDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const coinName = route.params.coinName;
  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        midComponent={
          <View style={{flexDirection: 'row', gap: 8}}>
            <Image source={ImageAvatar} style={styles.icon} />
            <Text style={styles.textBody3Regular}>{coinName}</Text>
          </View>
        }
      />
      <View style={styles.container}>
        <View style={styles.infoCoin}>
          <View style={{gap: 6}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>Balance</Text>
            <Text style={styles.textBody3Regular}>2.32 ETH</Text>
          </View>
          <View style={{alignItems: 'flex-end', gap: 6}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>Value</Text>
            <Text style={styles.textBody3Regular}>$6,911.70</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
          <ActionItem icon={IconBuy} title="buy" />
          <ActionItem icon={IconSwap} title="swap" />
          <ActionItem icon={IconSend} title="send" />
          <ActionItem icon={IconReceive} title="receive" />
        </View>
        <View style={{paddingVertical: 16, gap: 6}}>
          <Text style={[styles.textCap1, {opacity: 0.6}]}>Price</Text>
          <Text style={styles.textBody3Regular}>$1,555.68</Text>
          <View style={{flexDirection: 'row', gap: 8}}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>+$5.16</Text>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>(+1.23%)</Text>
          </View>
        </View>
        {/* //CHART */}
        <View style={{gap: 6}}>
          <Text style={[styles.textCap1, {opacity: 0.6}]}>
            About {coinName}
          </Text>
          <Text style={styles.textBody1Regular}>
            Ethereum is a decentralized open-source blockchain system that
            features its own cryptocurrency, Ether. ETH works as a platform for
            numerous other cryptocurrencies, as well as for the execution of
            decentralized smart contracts.
          </Text>
          <TouchableOpacity style={styles.buttonViewMore}>
            <Text style={[styles.textCap1, {opacity: 0.6}]}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={{gap: 6, paddingVertical: 16}}>
          <Text style={[styles.textCap1, {opacity: 0.6}]}>Stats</Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>24h volume</Text>
            <Text style={styles.textCap1}>$3.37b</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>Market cap.</Text>
            <Text style={styles.textCap1}>$186.82b</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>Total supply</Text>
            <Text style={styles.textCap1}>120,221.729</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textCap1}>Circulating supply</Text>
            <Text style={styles.textCap1}>120,221.729</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <TouchableOpacity style={styles.buttonViewMore}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonViewMore}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Website</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonViewMore}>
              <Text style={[styles.textCap1, {opacity: 0.6}]}>Reddit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppWrapper>
  );
};

export default CoinDetailScreen;
