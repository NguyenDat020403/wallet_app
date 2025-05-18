import React, {SetStateAction, useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {
  GasEstimatesResponse,
  Tokens,
} from '@/features/home/redux/RTKQuery/types';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useGetEstimateGasMutation} from '@/features/home/redux/RTKQuery';
import {useAppSelector} from '@/redux/hooks';
import {AppBottomSheetModal, AppButton} from '@/components';
import {
  IconFast,
  IconLightSpeed,
  IconSendTransaction,
  IconSlow,
  IconSuperFast,
} from '@/assets/icons';
import {Image} from '@rneui/base';
import {goBack} from '@/navigation/RootNavigation';

type TransactionScreen3 = {
  amount: string;
  token: Tokens;
  address: string;
};

const TransactionScreen3: React.FC<TransactionScreen3> = ({
  amount,
  token,
  address,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {secretLocal} = useAppSelector(state => state.authReducer);
  const walletIndex = token.network.chain_id === '0' ? 1 : 0;
  const [getGas, {data, isSuccess}] = useGetEstimateGasMutation();

  const [selectedFee, setSelectedFee] = useState({
    fee: 0,
    index: 0,
  });
  const [isPickTheRange, setIsPickTheRange] = useState(true);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (token?.network?.chain_id && token.network.chain_id === '0') {
      console.log('dasdasd');

      const ownerAddress = secretLocal.wallets?.[1]?.address;
      if (!ownerAddress) return;
      getGas({
        chain_id: token.network.chain_id,
        ownerAddress: ownerAddress,
        amount: parseFloat(amount),
      });
    } else {
      getGas({chain_id: token.network.chain_id});
    }
  }, [token, amount]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      if (token.network.chain_id === '0') {
        setSelectedFee({fee: data.economyFee || 0, index: 0});
      } else {
        setSelectedFee({
          fee: parseFloat(data.medium?.totalCost || '0'),
          index: 0,
        });
      }
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          height: safeAreaInsets.screenWidth / 1.5,
          justifyContent: 'center',
        }}>
        <Image source={IconSendTransaction} style={{width: 100, height: 100}} />
        <Text style={styles.textHeading3}>Send</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textHeading5}>-{amount}</Text>
          <Text style={[styles.textHeading5, {color: '#B3B3B3'}]}>
            {' ' + token.token.symbol}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={{flexGrow: 1}}>
        <View style={{gap: 8, marginBottom: 16}}>
          <Text style={[styles.textBody1Regular, {color: '#B3B3B3'}]}>
            {token.token.token_name} fee
          </Text>
          {isPickTheRange ? (
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
              }}>
              <Text style={styles.textBody1Regular}>
                {selectedFee.fee} {' ' + token.token.symbol} | Choose others"
              </Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={{gap: 8, marginBottom: 16}}>
          <Text style={[styles.textBody1Regular, {color: '#B3B3B3'}]}>
            From
          </Text>
          <Text style={styles.textBody1Regular}>
            {secretLocal.wallets![walletIndex].address}
          </Text>
        </View>
        <View style={{gap: 8, marginBottom: 16}}>
          <Text style={[styles.textBody1Regular, {color: '#B3B3B3'}]}>To</Text>
          <Text style={styles.textBody1Regular}>{address}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          marginBottom: 16,
          width: safeAreaInsets.screenWidth - 32,
        }}>
        <AppButton
          buttonStyle={{width: (safeAreaInsets.screenWidth - 32 - 16) / 2}}
          isOpposite={true}
          title="Cancel"
          onPress={() => {
            goBack();
          }}
        />
        <AppButton
          buttonStyle={{width: (safeAreaInsets.screenWidth - 32 - 16) / 2}}
          title="Confirm"
          onPress={() => {
            setIsVisible(false);
          }}
        />
      </View>
      <AppBottomSheetModal
        autoSize
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isBottomInset>
        <FeeList
          data={data}
          setSelectedFee={setSelectedFee}
          indexCurrent={selectedFee.index}
        />
        <AppButton
          title="Confirm"
          onPress={() => {
            setIsVisible(false);
          }}
        />
      </AppBottomSheetModal>
    </View>
  );
};

export default TransactionScreen3;

type FeeListProps = {
  data?: GasEstimatesResponse;
  indexCurrent?: number;
  setSelectedFee: React.Dispatch<SetStateAction<{fee: number; index: number}>>;
};

const FeeList: React.FC<FeeListProps> = ({
  data,
  setSelectedFee,
  indexCurrent,
}) => {
  const styles = useStyles();

  const [isSelected, setIsSelected] = useState(indexCurrent || 1);

  const ListFeeBTC = [
    {
      key: 1,
      title: 'Minimum',
      value: data?.minimumFee,
      icon: IconSlow,
    },
    {
      key: 2,
      title: 'Economy',
      // value: data?.economyFee,
      value: 0.000012,
      icon: IconFast,
    },
    {
      key: 3,
      title: 'Hour',
      value: data?.hourFee,
      icon: IconFast,
    },
    {
      key: 4,
      title: 'Half hour',
      value: data?.halfHourFee,
      icon: IconSuperFast,
    },
    {
      key: 5,
      title: 'Fastest',
      value: data?.fastestFee,
      icon: IconLightSpeed,
    },
  ];

  return (
    <View style={{gap: 12, flex: 1, marginBottom: 16}}>
      {ListFeeBTC.map(item => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setIsSelected(item.key);
              setSelectedFee({fee: item.value!, index: item.key});
            }}
            key={item.key}
            style={[
              styles.itemFee,
              {
                borderColor: isSelected === item.key ? '#FFF' : '#0F0F0F',
              },
            ]}>
            <Image
              source={item.icon}
              style={{width: 40, height: 40}}
              resizeMode="contain"
            />
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text style={styles.textBody3Regular}>{item?.title}</Text>
              <Text style={styles.textBody1Regular}>
                {item?.value || '...'}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {/* Option 
      <View style={styles.itemFee}>
        <Image source={IconOptionFee} style={{width: 40, height: 40}} />
      </View>*/}
    </View>
  );
};
