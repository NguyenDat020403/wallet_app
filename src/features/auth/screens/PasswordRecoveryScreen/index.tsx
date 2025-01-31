import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import {Image, TabView, Text} from '@rneui/themed';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import BackgroundAuthentication from '../components/BackgroundAuth';
import {IconCheckActive, IconCheckEmpty} from '@/assets/icons';
import AppButton from '@/components/AppButton';
import {goBack, navigate} from '@/navigation/RootNavigation';
import {OtpInput} from 'react-native-otp-entry';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import AppDialog from '@/components/AppDialog';

interface RecoveryPasswordScreenProps
  extends MainStackScreenProps<'RecoveryPasswordScreen'> {}

const RecoveryPasswordScreen: React.FC<RecoveryPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const styles = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabIndex = (newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
  return (
    <AppWrapper style={styles.container}>
      <BackgroundAuthentication
        item1Style={{top: 50, left: -150, zIndex: -100}}
      />
      <TabView value={tabIndex} onChange={setTabIndex} disableSwipe={true}>
        <TabView.Item style={{flex: 1}}>
          <RecoveryScreenTab1 tabIndex={handleTabIndex} />
        </TabView.Item>
        <TabView.Item style={{flex: 1}}>
          <RecoveryScreenTab2 tabIndex={handleTabIndex} />
        </TabView.Item>
        <TabView.Item style={{flex: 1}}>
          <RecoveryScreenTab3 tabIndex={handleTabIndex} />
        </TabView.Item>
      </TabView>
    </AppWrapper>
  );
};

type CheckBoxProps = {
  isChecked: boolean;
  setIsChecked: () => void;
  title: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  isChecked,
  setIsChecked,
  title,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.boxCheck}>
      <Text
        style={[styles.textBox, {color: isChecked ? '#004CFF' : '#000000'}]}>
        {title}
      </Text>
      <Image
        onPress={setIsChecked}
        source={isChecked ? IconCheckActive : IconCheckEmpty}
        style={{width: 22, height: 22}}
        containerStyle={styles.iconCheck}
      />
    </View>
  );
};

type RecoveryScreenTab1Props = {
  tabIndex: (tab: number) => void;
};
const RecoveryScreenTab1: React.FC<RecoveryScreenTab1Props> = ({tabIndex}) => {
  const styles = useStyles();
  const [isCheckBox, setIsCheckBox] = useState(true);

  const onNext = () => {
    tabIndex(1);
  };

  return (
    <>
      <View style={styles.body}>
        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.desc}>
          How you would like to restore your password?
        </Text>
        <View style={styles.box}>
          <CheckBox
            title="SMS"
            isChecked={isCheckBox}
            setIsChecked={() => {
              setIsCheckBox(!isCheckBox);
            }}
          />
          <CheckBox
            title="Email"
            isChecked={!isCheckBox}
            setIsChecked={() => {
              setIsCheckBox(!isCheckBox);
            }}
          />
        </View>
      </View>
      <AppButton title="Next" onPress={onNext} />
      <AppButton
        onPress={() => {
          goBack();
        }}
        title="Cancel"
        buttonStyle={{backgroundColor: '#FFFFFF'}}
        textStyle={{color: '#202020', fontSize: 15}}
      />
    </>
  );
};

type RecoveryScreenTab2Props = {
  tabIndex: (tab: number) => void;
};
const RecoveryScreenTab2: React.FC<RecoveryScreenTab2Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const [isVisible, setIsVisible] = useState(false);

  const onNext = () => {
    tabIndex(2);
  };
  return (
    <>
      <View style={styles.body}>
        <AppDialog
          title="You reached out maximum amount of attempts. Please, try later."
          onPress={() => {
            setIsVisible(false);
          }}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
        />
        <Text style={styles.title}>Password Recovery</Text>
        <Text style={styles.desc}>
          Enter 4-digits code we sent you on your phone number
        </Text>
        <Text style={styles.phone}>+849*****44</Text>
        <View style={styles.box}>
          <OtpInput
            numberOfDigits={4}
            hideStick={true}
            autoFocus={false}
            blurOnFilled={true}
            disabled={false}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => console.log('Focused')}
            onBlur={() => console.log('Blurred')}
            onTextChange={text => console.log(text)}
            onFilled={text => console.log(`OTP is ${text}`)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              containerStyle: styles.otpCodeContainer,
            }}
          />
        </View>
      </View>
      <AppButton
        title="Send Again"
        onPress={() => {
          setIsVisible(true);
          onNext();
        }}
        buttonStyle={{
          width: 200,
          backgroundColor: '#FF5790',
          alignSelf: 'center',
        }}
      />
      <AppButton
        onPress={() => {
          goBack();
        }}
        title="Cancel"
        buttonStyle={{backgroundColor: '#FFFFFF'}}
        textStyle={{color: '#202020', fontSize: 15}}
      />
    </>
  );
};

type RecoveryScreenTab3Props = {
  tabIndex: (tab: number) => void;
};
const RecoveryScreenTab3: React.FC<RecoveryScreenTab3Props> = ({tabIndex}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const onNext = () => {
    tabIndex(0);
  };
  return (
    <>
      <View style={styles.body}>
        <Text style={styles.title}>Setup New Password</Text>
        <Text style={styles.desc}>
          Please, setup a new password for your account
        </Text>
        <View style={styles.box}>
          <TextInput
            placeholder="New Password"
            style={styles.textInput}
            placeholderTextColor={'#D2D2D2'}
          />
          <TextInput
            placeholder="Repeat Password"
            style={styles.textInput}
            placeholderTextColor={'#D2D2D2'}
          />
        </View>
      </View>
      <AppButton
        title="Save"
        onPress={() => {
          navigate('HomeScreen');
        }}
      />
      <AppButton
        onPress={() => {
          goBack();
        }}
        title="Cancel"
        buttonStyle={{backgroundColor: '#FFFFFF'}}
        textStyle={{color: '#202020', fontSize: 15}}
      />
    </>
  );
};

export default RecoveryPasswordScreen;
