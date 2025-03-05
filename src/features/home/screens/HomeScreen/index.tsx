import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {
  IconClock,
  IconNotification,
  IconNotificationLight,
  IconScan,
  IconSetting,
  IconStar,
  IconTopMenu,
} from '@/assets/icons';
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

interface HomeScreenProps extends MainStackScreenProps<'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const isNotAuth = useAppSelector(state => state.authReducer.isAuthenticated);

  return (
    <AppWrapper>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MenuScreen');
          }}
          activeOpacity={0.7}
          style={styles.headerLeft}>
          {isNotAuth ? (
            <></>
          ) : (
            <>
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
                <Text style={styles.textHeaderMessage}>Welcome Back!</Text>
                <Text style={styles.textHeaderName}>Dat N</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButtonRight}>
          <Text style={styles.headerTextButtonRight}>Go "Plus"</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {/* ---------------------------------------------------- */}
        <View
          style={{
            paddingHorizontal: 16,
            height: (safeAreaInsets.screenWidth - 32) / 2,
            position: 'relative',
          }}>
          <Image
            source={ImageDemoHome2}
            style={{
              width: safeAreaInsets.screenWidth - 32,
              height: (safeAreaInsets.screenWidth - 48) / 2,
            }}
            containerStyle={{borderRadius: 12}}
          />
          <View
            style={{
              height: (safeAreaInsets.screenWidth - 32) / 2 - 48,
              position: 'absolute',
              top: 16,
              left: 32,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textLarge}>Edit Photo</Text>
            <Text numberOfLines={2} style={styles.textMedium}>
              Unleash your creativity with the AI multi-editing toolbox!
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonSelectPhoto}>
              <Text style={styles.textButtonBanner}>Select Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------------------------------------------------- */}
        <HeaderList title="Stories" />
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
            gap: 16,
          }}
          numColumns={2}
          data={AIFunctionList}
          renderItem={({item}) => {
            return <AIItem title={item.title} url={item.uri} />;
          }}
        />
        {/* ---------------------------------------------------- */}
      </ScrollView>
    </AppWrapper>
  );
};

export default HomeScreen;
