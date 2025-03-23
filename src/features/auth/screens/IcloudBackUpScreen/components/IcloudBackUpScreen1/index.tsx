import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent,
  TextInput,
  View,
} from 'react-native';
import {Text} from '@rneui/themed';
import {AppButton, AppWrapper} from '@/components';
import useStyles from './styles';
import {Image} from '@rneui/base';
import {IconEyeActive, IconEyeHided} from '@/features/auth/assets/icons';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';

interface IcloudBackUpScreen1Props {
  tabIndex: (newTabIndex: number) => void;
}

const IcloudBackUpScreen1: React.FC<IcloudBackUpScreen1Props> = ({
  tabIndex,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <AppWrapper>
      <View style={styles.container}>
        <View>
          <Text style={styles.textBody3Regular}>iCloud Backup</Text>
          <Text style={[styles.textBody2Regular, {opacity: 0.6}]}>
            Choose a strong password to secure your new iCloud Backup.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              onChangeText={setPassword}
              value={password}
              style={[
                styles.textBody2Medium,
                {width: safeAreaInsets.screenWidth - 64},
              ]}
              placeholder="Enter Password"
              placeholderTextColor={'#FFFFFF30'}
              secureTextEntry={!isShowPassword}
              numberOfLines={1}
            />
            <Image
              source={!isShowPassword ? IconEyeActive : IconEyeHided}
              style={{width: 24, height: 24}}
              onPress={() => {
                setIsShowPassword(!isShowPassword);
              }}
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={90}>
        <AppButton
          buttonStyle={{
            opacity: password !== '' ? 1 : 0.6,
            marginHorizontal: 16,
          }}
          title="Continue"
          disable={!password}
          onPress={() => {}}
        />
      </KeyboardAvoidingView>
    </AppWrapper>
  );
};

export default IcloudBackUpScreen1;
