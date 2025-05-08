import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import {ScreenWidth} from '@rneui/base';
import {demoNewItems2} from '#/src/assets/images';

type NewItemProps = {
  data: any;
  numbItemPerRow?: number;
};

const NewItem: React.FC<NewItemProps> = ({data, numbItemPerRow}) => {
  const styles = useStyles();
  const WIDTH_ITEM_SCALE = numbItemPerRow
    ? (ScreenWidth - 32 - 5) / numbItemPerRow
    : ScreenWidth / 3;
  const HEIGHT_ITEM_SCALE = numbItemPerRow
    ? (ScreenWidth - 32 - 5) / numbItemPerRow
    : ScreenWidth / 3;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.container, {width: WIDTH_ITEM_SCALE}]}>
      <Image
        source={demoNewItems2}
        style={{
          width: WIDTH_ITEM_SCALE,
          height: HEIGHT_ITEM_SCALE,
          resizeMode: 'cover',
        }}
        containerStyle={styles.images}
      />
      <Text style={styles.textDesc}>
        {data.description
          ? data.description
          : 'Lorem ipsum dolor sit amet consectetur.'}
      </Text>
      <Text style={styles.textPrice}>
        {data.price ? '$' + data.price : '$17,00'}
      </Text>
    </TouchableOpacity>
  );
};

export default NewItem;
