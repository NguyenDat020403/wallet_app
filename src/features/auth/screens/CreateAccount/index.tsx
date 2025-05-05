import {View, Text} from 'react-native';
import React from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppWrapper} from '@/components';
import AppHeader from '@/components/AppHeader';
interface CreateNewWalletScreenProps
  extends MainStackScreenProps<'CreateAccountScreen'> {}

const CreateAccountScreen: React.FC<CreateNewWalletScreenProps> = ({
  route,
  navigation,
}) => {
  const styles = useStyles();

  return (
    <AppWrapper>
      <AppHeader title="Create New Account" style={{paddingHorizontal: 16}} />
      <View style={styles.container}>
        <Text style={styles.textBody2SemiBold}>Nhập thông tin của bạn</Text>
      </View>
    </AppWrapper>
  );
};

export default CreateAccountScreen;
