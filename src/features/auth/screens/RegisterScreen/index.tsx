import React, {useState} from 'react';
import {KeyboardAvoidingView, TextInput, View} from 'react-native';
import {Image, Text} from '@rneui/themed';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import BackgroundAuthentication from '../components/BackgroundAuth';
import {IconCamera, IconEyeOff, IconEyeOn} from '@/assets/icons';
import AppButton from '@/components/AppButton';
import {goBack} from '@/navigation/RootNavigation';

interface RegisterScreenProps extends MainStackScreenProps<'RegisterScreen'> {}

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);

  return (
    <AppWrapper style={styles.container}>
      <BackgroundAuthentication />
      <View style={{paddingHorizontal: 16, gap: 12}}>
        <Text style={styles.textTitle}>Create Account</Text>
        <Image source={IconCamera} style={{width: 90, height: 90}} />
      </View>
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{
          gap: 8,
          backgroundColor: '#FFFFFF',
          paddingVertical: 24,
        }}>
        <TextInput
          placeholder="Email/Phone"
          style={styles.textInput}
          placeholderTextColor={'#D2D2D2'}
        />
        <View style={{position: 'relative', justifyContent: 'center'}}>
          <TextInput
            secureTextEntry={!isShowPassword}
            placeholder="Password"
            style={styles.textInput}
            placeholderTextColor={'#D2D2D2'}
          />
          <Image
            onPress={() => {
              setIsShowPassword(!isShowPassword);
            }}
            source={isShowPassword ? IconEyeOn : IconEyeOff}
            style={{width: 16, height: 16}}
            containerStyle={{
              position: 'absolute',
              right: 32,
            }}
          />
        </View>
        <View style={{position: 'relative', justifyContent: 'center'}}>
          <TextInput
            secureTextEntry={!isShowRePassword}
            placeholder="Confirm Password"
            style={styles.textInput}
            placeholderTextColor={'#D2D2D2'}
          />
          <Image
            onPress={() => {
              setIsShowRePassword(!isShowRePassword);
            }}
            source={isShowRePassword ? IconEyeOn : IconEyeOff}
            style={{width: 16, height: 16}}
            containerStyle={{
              position: 'absolute',
              right: 32,
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <AppButton
        title="Sign Up"
        onPress={() => {}}
        buttonStyle={{marginTop: 32}}
      />
      <AppButton
        onPress={() => {
          goBack();
        }}
        title="Cancel"
        buttonStyle={{backgroundColor: '#FFFFFF'}}
        textStyle={{color: '#202020', fontSize: 15}}
      />
    </AppWrapper>
  );
};

export default RegisterScreen;
