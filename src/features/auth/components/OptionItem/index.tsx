import React from 'react';
import {Image} from '@rneui/base';
import {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useStyles from './styles';
import {IconChecked, IconCheckedDone} from '../../assets/icons';

type OptionItemProps = {
  title: string;
  desc?: string;
  icon: any;
  isForCheck?: boolean;
  iconRight?: any;
  textBelow?: string;
  onPress?: () => void;
};
const OptionItem: React.FC<OptionItemProps> = ({
  title,
  desc,
  icon,
  isForCheck,
  iconRight,
  textBelow,
  onPress,
}) => {
  const styles = useStyles();
  const [isAccepted, setIsAccepted] = useState(false);
  return (
    <View style={{paddingBottom: 16}}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onPress && onPress();
          setIsAccepted(!isAccepted);
        }}
        style={styles.container}>
        <Image source={icon} style={styles.icons} />
        <View style={{flexDirection: 'column', flex: 1}}>
          <Text style={styles.textBody3Regular}>{title}</Text>
          <Text style={[styles.textCap1, {opacity: 0.5}]}>{desc && desc}</Text>
        </View>
        {isForCheck ? (
          <>
            {!isAccepted ? (
              <Image source={IconChecked} style={styles.icons} />
            ) : (
              <Image source={IconCheckedDone} style={styles.icons} />
            )}
          </>
        ) : (
          <Image source={iconRight && iconRight} style={styles.icons} />
        )}
      </TouchableOpacity>
      {textBelow && (
        <Text style={[styles.textCap1, {opacity: 0.6}]}>{textBelow}</Text>
      )}
    </View>
  );
};
export default OptionItem;
