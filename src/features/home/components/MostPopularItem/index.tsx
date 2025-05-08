import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import {ScreenWidth} from '@rneui/base';
import {demoNewItems2} from '#/src/assets/images';
import {IconLove} from '@/assets/icons';

type MostPopularItemProps = {
  data: any;
};
const WIDTH_ITEM_SCALE = ScreenWidth / 3;
const HEIGHT_ITEM_SCALE = (ScreenWidth / 9) * 4;

const MostPopularItem: React.FC<MostPopularItemProps> = ({data}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[
        styles.container,
        {
          width: WIDTH_ITEM_SCALE + 8,
          height: HEIGHT_ITEM_SCALE + 54,
          marginBottom: 16,
        },
      ]}>
      <Image
        source={demoNewItems2}
        style={{
          width: WIDTH_ITEM_SCALE,
          height: HEIGHT_ITEM_SCALE,
        }}
        containerStyle={styles.images}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 4,
          paddingTop: 8,
          paddingBottom: 12,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Text style={styles.textNumbsOfLove}>
            {data.numbsOfLike ? data.numbsOfLike : '1700'}
          </Text>
          <Image
            source={IconLove}
            style={{width: 12, height: 12, resizeMode: 'cover'}}
          />
        </View>
        <Text style={styles.textType}>{data.type ? data.type : 'Hot'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MostPopularItem;
