import {View, Text, TouchableOpacity} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {AppBottomSheetModal, AppImage} from '@/components';
import {WalletNetwork} from '@/features/setting/redux/RTKQuery/types';
import useStyles from './styles';
import {Icon} from '@rneui/base';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Animated} from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToastMessage} from '@/functions';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
type AddressBottomSheetProps = {
  data?: WalletNetwork[];
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
};

const AddressBottomSheet: React.FC<AddressBottomSheetProps> = ({
  data,
  isVisible,
  setIsVisible,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();

  return (
    <AppBottomSheetModal
      snapPoints={['70%', '100%']}
      isVisible={isVisible}
      setIsVisible={setIsVisible}>
      {/* <View style={{padding: 16}}>
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
              {filteredData && (
                <CryptoTabItem
                  data={filteredData}
                  onPress={(network_id, index) => {
                    navigation.navigate('CoinDetailScreen', {
                      token: tokenData[index!],
                    });
                  }}
                />
              )} */}
    </AppBottomSheetModal>
  );
};

export default AddressBottomSheet;

type WalletItemProps = {
  item: WalletNetwork;
  index: number;
  expanded: boolean;
  toggleExpand: (index: number) => void;
};

const WalletItem: React.FC<WalletItemProps> = ({
  item,
  index,
  expanded,
  toggleExpand,
}) => {
  const styles = useStyles();
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const heightAnim = useSharedValue(0);
  const rotateAnim = useSharedValue(0);
  useEffect(() => {
    heightAnim.value = withTiming(
      expanded ? item.walletNetwork.length * 52 : 0,
      {
        duration: 600,
        easing: Easing.out(Easing.ease),
      },
    );
    rotateAnim.value = withTiming(expanded ? 52 * 10 : 0, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    });
  }, [expanded, heightAnim, rotateAnim, item.walletNetwork.length]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: heightAnim.value,
    overflow: 'hidden',
  }));

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotateAnim.value}deg`}],
  }));

  const handleCopy = async (address: string) => {
    await Clipboard.setString(address);
    showToastMessage('Copied');
  };
  return (
    <View key={index} style={{backgroundColor: '#FFF', marginBottom: 8}}>
      <TouchableOpacity
        onPress={() => {
          toggleExpand(index);
        }}
        style={styles.headerContainer}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
          }}>
          <AppImage
            source={{uri: item.wallet.thumbnail}}
            style={{width: 40, height: 40, borderRadius: 150}}
          />
          <Text style={styles.textSemiBold}>{item.wallet.wallet_name}</Text>
        </View>
        <Animated.View style={animatedIconStyle}>
          <Icon
            type="feather"
            name={expanded ? 'chevron-up' : 'chevron-down'}
            iconStyle={{fontSize: 20}}
          />
        </Animated.View>
      </TouchableOpacity>
      {expanded && (
        <Animated.View style={[styles.extendContainer, animatedStyle]}>
          {item.walletNetwork.map((i, subIndex) => (
            <TouchableOpacity
              onPress={() => handleCopy(i.address)}
              key={subIndex}
              style={styles.networkRow}>
              <AppImage
                source={{uri: i.networks?.thumbnail}}
                style={{width: 32, height: 32, borderRadius: 150}}
              />
              <View
                style={{
                  width: safeAreaInsets.screenWidth - 144,
                }}>
                <Text style={styles.textMedium}>
                  {i.networks?.network_name}
                </Text>
                <Text numberOfLines={1} style={styles.textCap}>
                  {i.address}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleCopy(i.address)}>
                <Icon type="feather" name="copy" iconStyle={{fontSize: 16}} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  );
};
