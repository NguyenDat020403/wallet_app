import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {IconInfoCircle} from '@/assets/icons';
import {useAppSelector} from '@/redux/hooks';

interface AddNetworkScreenProps
  extends MainStackScreenProps<'AddNetworkScreen'> {}

const AddNetworkScreen: React.FC<AddNetworkScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);

  return (
    <AppWrapper>
      <AppHeader title="Settings" />
      <View style={{paddingHorizontal: 16, flexDirection: 'row'}}>
        <View
          style={{
            flexGrow: 1,
            paddingHorizontal: 16,
            justifyContent: 'center',
          }}>
          <Image
            source={IconInfoCircle}
            style={{
              width: 12,
              height: 12,
            }}
          />
        </View>
        <Text style={[styles.textCap, {color: '#B3B3B3'}]}>
          Unverified internet providers may expose false blockchain data and
          track your network activity. Only proceed if you fully trust the
          network.
        </Text>
      </View>
    </AppWrapper>
  );
};

export default AddNetworkScreen;
