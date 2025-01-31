import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {AppLogo} from '@/assets/icons';
import AppButton from '@/components/AppButton';

interface FirstScreenProps extends MainStackScreenProps<'FirstScreen'> {}

const FirstScreen: React.FC<FirstScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  return (
    <AppWrapper style={styles.container}>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image
            source={AppLogo}
            style={styles.logo}
            containerStyle={styles.logo}
          />
        </View>
        <Text style={styles.textAppName}>Shoppe</Text>
        <Text style={styles.textAppInsight}>
          Beautiful eCommerce UI Kit for your online store
        </Text>
      </View>
      <AppButton
        title="Let's get started"
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
      />
      <View style={styles.registerContainer}>
        <Text style={styles.textRegister}>I already have an account</Text>
        <TouchableOpacity
          style={styles.iconArrowRight}
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}>
          <Icon
            type="antdesign"
            name="arrowright"
            size={14}
            color="#FFFFFF"
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      </View>
    </AppWrapper>
  );
};

export default FirstScreen;
