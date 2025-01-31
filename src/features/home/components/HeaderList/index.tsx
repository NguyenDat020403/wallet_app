import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Text} from '@rneui/themed';
import useStyles from './styles';

type HeaderListProps = {
  title?: string;
  isHaveButton?: boolean;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
};

const HeaderList: React.FC<HeaderListProps> = ({
  title,
  isHaveButton = false,
  onPress,
  rightComponent,
  leftComponent,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.leftComponent}>
        <Text style={styles.textSecondTitle}>{title}</Text>
        {leftComponent && leftComponent}
      </View>
      {isHaveButton && (
        <View style={styles.body}>
          <Text style={styles.textMoreInfo}>See All</Text>
          <TouchableOpacity
            style={styles.iconArrowRight}
            onPress={onPress && onPress}>
            <Icon
              type="antdesign"
              name="arrowright"
              size={14}
              color="#FFFFFF"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      )}
      {rightComponent && rightComponent}
    </View>
  );
};

export default HeaderList;
