import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {Image, ScreenWidth} from '@rneui/base';
import {ImageAvatar} from '@/features/auth/assets/images';
import {useAppSelector} from '@/redux/hooks';

interface BackUpWalletScreenProps
  extends MainStackScreenProps<'BackUpWalletScreen'> {}

const BackUpWalletScreen: React.FC<BackUpWalletScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const {currentUser, accessInfo, secretLocal} = useAppSelector(
    state => state.authReducer,
  );
  useEffect(() => {
    console.log(secretLocal[0]);
  }, [secretLocal[0]]);
  return (
    <AppWrapper>
      <AppHeader leftComponent={<></>} />
      <View style={styles.container}>
        <Text style={[styles.textBody3Regular, {textAlign: 'center'}]}>
          Your wallet is
          <Text style={[styles.textBody3Regular, {color: '#A87AD7'}]}>
            {' '}
            ready ✨
          </Text>
        </Text>
        <View style={styles.card}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              source={
                currentUser.avatar ? {uri: currentUser.avatar} : ImageAvatar
              }
              style={{width: 40, height: 40, borderRadius: 150}}
            />
            <Text
              style={[
                styles.textBody2Regular,
                {width: (ScreenWidth - 32 - 48) / 2},
              ]}
              numberOfLines={1}>
              {currentUser.username}
            </Text>
          </View>
          <View>
            <Text style={styles.textBody2SemiBold}>0 $</Text>
            <Text numberOfLines={1} style={styles.textCap1}>
              {secretLocal[0].wallets
                ? secretLocal[0].wallets[0].address
                : 'no data'}
            </Text>
            <Text numberOfLines={1} style={styles.textCap1}>
              {secretLocal[0].wallets && secretLocal[0].wallets[1].address}
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 16, marginBottom: 16, gap: 8}}>
        <Text
          style={[styles.textCap1, {textAlign: 'center', marginBottom: 16}]}>
          “Backing up” means saving your wallet’s{' '}
          <Text style={[styles.textCap1, {color: '#A87AD7'}]}>
            secret recovery phrase
          </Text>{' '}
          in a secure location that you control
        </Text>
        <AppButton
          title="Back Up Now"
          onPress={() => {
            navigation.navigate('RecoveryPhraseScreen');
          }}
        />
        <AppButton
          isOpposite
          title="Do it Later"
          onPress={() => {
            navigation.navigate('AppTabScreen');
          }}
        />
      </View>
    </AppWrapper>
  );
};

export default BackUpWalletScreen;
