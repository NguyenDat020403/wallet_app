import React from 'react';
import {StyleProp, TextProps, TextStyle, ViewStyle} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {TouchableOpacity} from 'react-native';

type AppButtonProps = {
  title?: string;
  onPress?: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disable?: boolean;
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disable,
}) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      activeOpacity={0.6}
      disabled={disable}
      style={[styles.button, buttonStyle]}>
      <Text style={[styles.textButton, textStyle]}>{title && title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
