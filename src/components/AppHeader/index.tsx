import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import useStyles from './styles';
import {goBack} from '@/navigation/RootNavigation';

export type AppHeaderProps = {
  style?: StyleProp<ViewStyle>;
  onGoBack?: () => void;
  leftComponent?: React.ReactNode;
  midComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftStyle?: StyleProp<ViewStyle>;
  midStyle?: StyleProp<ViewStyle>;
  rightStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  title?: string;
  rightTitle?: string;
  onPressRightTitle?: () => void;
};
const AppHeader: React.FC<AppHeaderProps> = ({
  style,
  onGoBack,
  onPressRightTitle,
  leftComponent,
  midComponent,
  rightComponent,
  leftStyle,
  midStyle,
  rightStyle,
  titleStyle,
  title = '',
  rightTitle,
}) => {
  const styles = useStyles();
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.leftSide, leftStyle]}>
        {leftComponent ? (
          leftComponent
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (onGoBack) {
                onGoBack();
              } else {
                goBack();
              }
            }}>
            <Icon type="feather" name="arrow-left" color={'#FFFFFF'} />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.midSide, midStyle]}>
        {midComponent ? (
          midComponent
        ) : (
          <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
        )}
      </View>

      <View style={[styles.rightSide, rightStyle]}>
        {rightComponent ? (
          rightComponent
        ) : rightTitle ? (
          <TouchableOpacity onPress={onPressRightTitle}>
            <Text style={styles.rightTitle}>{rightTitle}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default AppHeader;
