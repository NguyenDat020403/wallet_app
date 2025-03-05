import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, Image, Text} from '@rneui/themed';
import {AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {IconCrown} from '@/assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import {MenuLine} from './components';

interface MenuScreenProps extends MainStackScreenProps<'MenuScreen'> {}

const MenuScreen: React.FC<MenuScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  return (
    <AppWrapper>
      <View style={{paddingHorizontal: 16}}>
        <AppHeader title="Settings" />
        <View style={styles.info}>
          <View style={styles.infoLeft}>
            <Image
              source={{
                uri: 'https://photo.znews.vn/w660/Uploaded/neg_yslewlx/2023_01_09/avatar_2_reviews.jpg',
              }}
              style={styles.avatar}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.textName}>Dat N</Text>
              <Text style={styles.textEmail}>nguyendat243@gmail.com</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={['#B453FF', '#9B1AFF', '#AE46FF']}
            style={styles.banner}>
            <View style={styles.backgroundCrown}>
              <Image source={IconCrown} style={{width: 32, height: 32}} />
            </View>
            <View style={styles.textBanner}>
              <Text style={styles.textBold}>Upgrade to PRO</Text>
              <Text style={styles.textRegular}>
                Enjoy all features & benefits
              </Text>
              <Text style={styles.textRegular}>without any restrictions</Text>
            </View>
            <Icon
              type="feather"
              name="chevron-right"
              color={'#FFFFFF'}
              containerStyle={{justifyContent: 'center'}}
            />
          </LinearGradient>
        </TouchableOpacity>
        <MenuLine title="General" />
        <MenuLine title="About" />
      </View>
    </AppWrapper>
  );
};

export default MenuScreen;
