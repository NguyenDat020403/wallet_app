import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import useStyles from './styles';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

type AIItemProps = {
  title: string;
  url: string;
};

const AIItem: React.FC<AIItemProps> = ({title, url}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <Image
        source={{uri: url}}
        style={{width: '100%', height: '100%'}}
        containerStyle={{borderRadius: 12}}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AIItem;
