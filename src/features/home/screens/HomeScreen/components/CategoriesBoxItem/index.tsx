import React from 'react';
import {View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {ScreenWidth} from '@rneui/base';

type CategoriesBoxItemProps = {
  data: Category;
};

const CategoriesBoxItem: React.FC<CategoriesBoxItemProps> = ({data}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{uri: data.resource[0].url}}
          style={styles.image}
          containerStyle={{borderRadius: 9}}
        />
        <Image
          source={{uri: data.resource[1].url}}
          style={styles.image}
          containerStyle={{borderRadius: 9}}
        />
      </View>
      <View style={styles.row}>
        <Image
          source={{uri: data.resource[2].url}}
          style={styles.image}
          containerStyle={{borderRadius: 9}}
        />
        <Image
          source={{uri: data.resource[3].url}}
          style={styles.image}
          containerStyle={{borderRadius: 9}}
        />
      </View>
      <View style={styles.detail}>
        <Text style={styles.name} numberOfLines={1}>
          {data.name}
        </Text>
        <Text style={styles.quantity}>{data.quantity}</Text>
      </View>
    </View>
  );
};

export default CategoriesBoxItem;
