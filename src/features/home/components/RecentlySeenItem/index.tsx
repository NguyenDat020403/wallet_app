import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';

type RecentlySeenItemProps = {
  data: any;
};

const RecentlySeenItem: React.FC<RecentlySeenItemProps> = ({data}) => {
  const styles = useStyles();
  return (
    <View
      style={{
        width: 50,
        height: 58,
        justifyContent: 'center',
      }}>
      <TouchableOpacity style={[styles.avatarAndShadow, {alignSelf: 'center'}]}>
        <Image
          source={{
            uri: data.uri,
          }}
          style={[styles.avatar, {width: 50, height: 50}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RecentlySeenItem;
