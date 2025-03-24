import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, TextInput, View} from 'react-native';
import {AppButton, AppDialog, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {Image, TabView} from '@rneui/base';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {IconEyeActive, IconEyeHided} from '../../assets/icons';

interface IcloudBackUpScreenProps
  extends MainStackScreenProps<'IcloudBackUpScreen'> {}

const IcloudBackUpScreen: React.FC<IcloudBackUpScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();
  const [password, setPassword] = useState('');
  const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <AppWrapper style={{paddingBottom: 12}}>
      <AppHeader
        title="Icloud Backup"
        titleStyle={{color: '#FFFFFF'}}
        style={{
          zIndex: 1,
          paddingHorizontal: 16,
        }}
      />
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
      <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={20}>
        <AppButton
          buttonStyle={{
            opacity: password !== '' ? 1 : 0.6,
            marginHorizontal: 16,
          }}
          title="Continue"
          disable={!password}
          onPress={() => {
            setIsVisibleSuccessModal(true);
          }}
        />
      </KeyboardAvoidingView>
      <AppDialog
        onPress={() => {
          navigation.navigate('AppTabScreen');
        }}
        setIsVisible={setIsVisibleSuccessModal}
        isVisible={isVisibleSuccessModal}
        title="iCloud Backup Completed ✅"
        desc="This wallet was successfully backed up."
      />
    </AppWrapper>
  );
};

export default IcloudBackUpScreen;
