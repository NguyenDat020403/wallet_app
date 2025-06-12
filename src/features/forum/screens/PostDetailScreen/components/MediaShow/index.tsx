import {View, Text, TouchableOpacity} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {Image} from '@/features/forum/redux/RTKQuery/types';
import useStyles from './styles';
import ReactNativeModal from 'react-native-modal';
import {AppImage} from '@/components';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Icon} from '@rneui/base';
import {FlatList} from 'react-native';

type MediaShowProps = {
  data: Image[];
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
};

const MediaShow: React.FC<MediaShowProps> = ({
  data,
  isVisible,
  setIsVisible,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const screenWidth = safeAreaInsets.screenWidth - 32;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <ReactNativeModal
      backdropColor="#000"
      backdropOpacity={0.8}
      statusBarTranslucent
      propagateSwipe
      useNativeDriver
      useNativeDriverForBackdrop
      coverScreen={true}
      style={styles.container}
      isVisible={isVisible}
      onBackdropPress={() => {
        setIsVisible(false);
      }}>
      <FlatList
        data={data}
        onScroll={event => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / safeAreaInsets.screenWidth,
          );
          setCurrentIndex(index);
        }}
        horizontal
        pagingEnabled
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <AppImage
            source={{uri: item.imageUrl}}
            style={{
              width: safeAreaInsets.screenWidth,
              height: undefined,
              aspectRatio: 9 / 16,
            }}
            resizeMode="contain"
            haveDefault={false}
          />
        )}
      />
      <View style={styles.dot}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dotStyle,
              {
                backgroundColor: index === currentIndex ? '#FFF' : '#888',
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsVisible(false);
        }}
        style={styles.iconClose}>
        <Icon
          type="feather"
          name="x"
          iconStyle={{fontSize: 20}}
          color={'#000'}
        />
      </TouchableOpacity>
    </ReactNativeModal>
  );
};

export default MediaShow;
