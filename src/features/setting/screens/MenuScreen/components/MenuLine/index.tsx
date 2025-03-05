import React from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';

type MenuLineProps = {
  title?: string;
};

const MenuLine: React.FC<MenuLineProps> = ({title}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title && title}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default MenuLine;
