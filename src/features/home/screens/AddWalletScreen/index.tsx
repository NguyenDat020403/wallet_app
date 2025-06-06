import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppHeader, AppImage, AppWrapper} from '@/components';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {IconAddWallet, IconImportWallet} from '@/assets/icons';
import {Icon, Image} from '@rneui/base';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {createWallet} from '../../redux/slices';

interface AddWalletScreenProps
  extends MainStackScreenProps<'AddWalletScreen'> {}

const AddWalletScreen: React.FC<AddWalletScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const handleCreateWallet = () => {
    dispatch(createWallet({}));
  };
  const handleImportWallet = () => {
    navigation.navigate('ImportWalletScreen');
  };
  return (
    <AppWrapper>
      <AppHeader title="Create Wallet" />
      <View style={styles.container}>
        <Text style={styles.textHeading2}>Add new wallet</Text>
        <TouchableOpacity
          onPress={() => {
            handleCreateWallet();
          }}
          style={{
            paddingTop: 32,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
            <AppImage
              source={IconAddWallet}
              style={{width: 24, height: 24}}
              haveDefault={false}
            />
            <View>
              <Text style={styles.textBody3Bold}>Create wallet</Text>
              <Text style={styles.textBody1Regular}>
                Create a wallet from a new seed phrase
              </Text>
            </View>
          </View>
          <Icon
            type="feather"
            name="chevron-right"
            color={'#000'}
            iconStyle={{fontSize: 16}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleImportWallet}
          style={{
            paddingTop: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', gap: 16, alignItems: 'center'}}>
            <Image source={IconImportWallet} style={{width: 24, height: 24}} />
            <View
              style={{
                width: safeAreaInsets.screenWidth - 100,
              }}>
              <Text style={styles.textBody3Bold}>Import Wallet</Text>
              <Text style={styles.textBody1Regular}>
                Import wallet using seed phrase, private key, or cloud backup.
              </Text>
            </View>
          </View>
          <Icon
            type="feather"
            name="chevron-right"
            color={'#000'}
            iconStyle={{fontSize: 16}}
          />
        </TouchableOpacity>
      </View>
    </AppWrapper>
  );
};

export default AddWalletScreen;
