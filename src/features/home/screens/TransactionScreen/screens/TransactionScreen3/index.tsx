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
  IconSlow,
  IconSuperFast,
} from '@/assets/icons';
import {Image} from '@rneui/base';

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

  const [dataFee, setDataFee] = useState<boolean>();
  const [selectedFee, setSelectedFee] = useState({
    fee: dataFee ? data?.economyFee!.toString() : data?.medium?.totalCost,
    index: 0,
  });
  const [isPickTheRange, setIsPickTheRange] = useState(true);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (token?.network?.chain_id && token.network.chain_id === '0') {
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
    }, 1000);

    return () => clearTimeout(timeout);
  }, [token, amount]);

  useEffect(() => {
    if (isSuccess) {
      if (token.network.chain_id === '0') {
        setDataFee(true);
        console.log(data);
      } else {
        setDataFee(false);
      }
    }
  }, [isSuccess]);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.textHeading2}>Send</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textBody3Regular}>-{amount}</Text>
          <Text style={[styles.textBody3Regular, {color: '#B3B3B3'}]}>
            {' ' + token.token.symbol}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
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
      <Text style={[styles.textBody1Regular, {color: '#B3B3B3'}]}>From</Text>
      <Text style={styles.textBody1Regular}>
        {secretLocal.wallets![walletIndex].address}
      </Text>
      <Text style={[styles.textBody1Regular, {color: '#B3B3B3'}]}>To</Text>
      <Text style={styles.textBody1Regular}>{address}</Text>
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
  setSelectedFee: React.Dispatch<
    SetStateAction<{fee: string | undefined; index: number}>
  >;
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
      value: data?.economyFee,
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
              setSelectedFee({fee: item.value!.toString(), index: item.key});
            }}
            key={item.key}
            style={{
              flexDirection: 'row',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: isSelected === item.key ? '#FFF' : '#0F0F0F',
              paddingHorizontal: 16,
              paddingVertical: 12,
              gap: 16,
            }}>
            <Image
              source={item.icon}
              style={{width: 60, height: 60}}
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
    </View>
  );
};
