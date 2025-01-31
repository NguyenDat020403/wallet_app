import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import HeaderList from '../HeaderList';
import {IconClock} from '@/assets/icons';
import {formatTime} from './function';

export type FlashSaleItem = {
  productName: string;
  discount: number;
  url: string;
  endTime: string;
  imageUrl: string;
};

export type FlashSaleResponse = {
  eventTime: number;
  resource: FlashSaleItem[];
};

type FlashSaleListProps = {
  data: FlashSaleResponse;
};

const FlashSaleList: React.FC<FlashSaleListProps> = ({data}) => {
  const styles = useStyles();

  const timeLeftRef = useRef(data.eventTime);
  const [displayTime, setDisplayTime] = useState(formatTime(data.eventTime));
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeftRef.current > 0) {
        timeLeftRef.current -= 1;
        setDisplayTime(formatTime(timeLeftRef.current)); // Cập nhật UI
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <HeaderList
        title="Flash Sale"
        onPress={() => {
          console.log('Flash Sale');
        }}
        rightComponent={
          <View style={styles.timeCount}>
            <Image
              source={IconClock}
              style={{width: 17, height: 20, resizeMode: 'stretch'}}
              containerStyle={{alignSelf: 'center'}}
            />
            <Text style={styles.textTime}>{displayTime.hours}</Text>
            <Text style={styles.textTime}>{displayTime.minutes}</Text>
            <Text style={styles.textTime}>{displayTime.seconds}</Text>
          </View>
        }
      />
      <FlatList
        numColumns={3}
        keyExtractor={(item, index) => index.toString() + item.productName}
        contentContainerStyle={styles.listFlashSale}
        data={data.resource.slice(0, 7)}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.flashSaleItem}>
              <Text style={styles.textDiscount}>-{item.discount}%</Text>
              <Image
                source={{uri: item.url}}
                style={styles.imageFlashSale}
                containerStyle={{borderRadius: 4}}
              />
            </View>
          );
        }}
      />
    </>
  );
};

export default FlashSaleList;
