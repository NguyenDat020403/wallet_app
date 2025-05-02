import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {Image} from '@rneui/base';
import {ImageAvatar} from '@/features/auth/assets/images';
import {useAppSelector} from '@/redux/hooks';
import {useGetWalletDefaultMutation} from '../../redux/RTKQuery';

interface BackUpWalletScreenProps
  extends MainStackScreenProps<'BackUpWalletScreen'> {}

const BackUpWalletScreen: React.FC<BackUpWalletScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const {currentUser, accessInfo} = useAppSelector(state => state.authReducer);
  const [getWalletDefault, {data: dataWallet, isSuccess}] =
    useGetWalletDefaultMutation();
  useEffect(() => {
    getWalletDefault({});
  }, []);
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
              source={currentUser.avatar ? currentUser.avatar : ImageAvatar}
              style={{width: 40, height: 40}}
            />
            <Text style={styles.textBody2Regular}>{currentUser.username}</Text>
          </View>
          <View>
            <Text numberOfLines={1} style={styles.textBody2Regular}>
              {dataWallet?.data.wallet_address}
            </Text>
            <Text style={styles.textBody2SemiBold}>
              {dataWallet?.data.wallet_balance} $
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 16, paddingHorizontal: 16}}>
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
          textStyle={{color: '#FFFFFF'}}
          buttonStyle={styles.button}
          title="Do it Later"
          onPress={() => {}}
        />
      </View>
    </AppWrapper>
  );
};

export default BackUpWalletScreen;
