import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {OptionItem} from '../../components';
import {
  IconArrowRight,
  IconCloudBackUp,
  IconManualBackUp,
} from '../../assets/icons';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {setIsAuthenticated} from '../../redux/slices';
import {IconQR} from '@/assets/icons';
import {QRCodeModal} from './screens';

interface RecoveryPhraseScreenProps
  extends MainStackScreenProps<'RecoveryPhraseScreen'> {}

const ListSecretWords = [
  'physical',
  'vote',
  'apple',
  'eager',
  'income',
  'obey',
  'summer',
  'other',
  'purpose',
  'radar',
  'avoid',
  'draw',
];

const RecoveryPhraseScreen: React.FC<RecoveryPhraseScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {secretLocal} = useAppSelector(state => state.authReducer);
  const words = secretLocal.mnemonic.split(' ');
  const [showBlur, setShowBlur] = useState(true);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader title="Wallet Default" />
        <View style={{paddingVertical: 16}}>
          <Text style={styles.textBody3Medium}>Save your seed phrase</Text>
          <Text style={styles.textBody1Regular}>
            Write down the words in order and store them safely. Do not share —
            losing them means losing your assets.
          </Text>
          <Pressable
            onPress={() => {
              setShowBlur(!showBlur);
            }}
            style={{
              marginTop: 16,
              position: 'relative',
            }}>
            <FlatList
              data={words}
              renderItem={({item, index}) => (
                <Text
                  style={[
                    styles.textBody1Regular,
                    {
                      width: (safeAreaInsets.screenWidth - 24) / 2,
                      marginLeft: 12,
                    },
                  ]}>
                  {index + 1}. {item}
                </Text>
              )}
              contentContainerStyle={styles.boxSecret}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
            {showBlur && (
              <Pressable
                onPress={() => {
                  setShowBlur(!showBlur);
                }}
                style={styles.hideBoxSecret}>
                <Text style={[styles.textBody2Regular, {textAlign: 'center'}]}>
                  Tap to reveal your seed phrase.
                </Text>
                <Text style={[styles.textBody2Regular, {textAlign: 'center'}]}>
                  Please ensure your screen is not visible to others.
                </Text>
              </Pressable>
            )}
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
              setShowBlur(true);
            }}
            activeOpacity={0.6}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <Text style={[styles.textBody2Regular]}>Generate QRCode</Text>
            <Image source={IconQR} style={{width: 32, height: 32}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 16, marginBottom: 16}}>
        <OptionItem
          onPress={() => {
            // navigation.navigate('IcloudBackUpScreen');
            // getData({name: 'Dat'});
          }}
          title="iCloud Backup"
          icon={IconCloudBackUp}
          desc="Encrypt your secret recovery phrase with a password."
          iconRight={IconArrowRight}
        />
        <AppButton
          title="Done"
          onPress={() => {
            dispatch(setIsAuthenticated(true));
            navigation.navigate('AppTabScreen');
          }}
        />
        <QRCodeModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          data={secretLocal.mnemonic}
        />
      </View>
    </AppWrapper>
  );
};

export default RecoveryPhraseScreen;
