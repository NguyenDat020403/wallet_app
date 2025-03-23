import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {Icon, Image} from '@rneui/themed';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AIFunctionList, CategoriesResponse, flashSaleItems} from './types';
import {FlashSaleList, HeaderList, NewItem, StoryItem} from '../../components';
import MostPopularItem from '../../components/MostPopularItem';
import {useAppSelector} from '@/redux/hooks';
import {navigate} from '@/navigation/RootNavigation';
import RecentlySeenItem from '../../components/RecentlySeenItem';
import {AIItem, CategoriesBox} from './components';
import {ImageDemoHome1, ImageDemoHome2} from '@/assets/images';
import AppHeader from '@/components/AppHeader';
import {
  IconArrowDown,
  IconBuy,
  IconQR,
  IconReceive,
  IconSetting,
} from '@/assets/icons';
import {IconCopy} from '@/features/auth/assets/icons';
import {ImageAvatar} from '@/features/auth/assets/images';

interface HomeScreenProps extends MainStackScreenProps<'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const isNotAuth = useAppSelector(state => state.authReducer.isAuthenticated);

  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        leftComponent={
          <TouchableOpacity>
            <Image source={IconSetting} style={styles.iconHeader} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{flexDirection: 'row', gap: 16}}>
            <TouchableOpacity>
              <Image source={IconCopy} style={styles.iconHeader} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={IconQR} style={styles.iconHeader} />
            </TouchableOpacity>
          </View>
        }
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.userInfo}>
        <Image source={ImageAvatar} style={styles.icon} />
        <Text style={styles.textBody3Regular}>userName</Text>
        <Image source={IconArrowDown} style={styles.icon} />
      </TouchableOpacity>
      <Text
        style={[styles.textHeading1, {textAlign: 'center', marginBottom: 16}]}>
        $0.00
      </Text>
      <View style={{flexDirection: 'row', gap: 32, alignSelf: 'center'}}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.backgroundIcon}>
            <Image source={IconBuy} style={styles.icon} />
          </View>
          <Text style={styles.textCap1}>buy</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.backgroundIcon}>
            <Image source={IconReceive} style={styles.icon} />
          </View>
          <Text style={styles.textCap1}>receive</Text>
        </TouchableOpacity>
      </View>
    </AppWrapper>
  );
};

export default HomeScreen;
