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
import {CategoriesResponse, flashSaleItems, RecentlyViewedData} from './types';
import {FlashSaleList, HeaderList, NewItem, StoryItem} from '../../components';
import MostPopularItem from '../../components/MostPopularItem';
import {useAppSelector} from '@/redux/hooks';
import {navigate} from '@/navigation/RootNavigation';
import RecentlySeenItem from '../../components/RecentlySeenItem';
import {CategoriesBox} from './components';
import {ImageDemoHome1, ImageDemoHome2} from '@/assets/images';

interface HomeScreenProps extends MainStackScreenProps<'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const isNotAuth = useAppSelector(state => state.authReducer.isAuthenticated);

  return (
    <AppWrapper>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
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
        </View>
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
        <HeaderList title="Recently viewed" />
        <FlatList
          scrollEventThrottle={6}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
          data={RecentlyViewedData}
          renderItem={({item}) => {
            return <RecentlySeenItem data={item} />;
          }}
        />
        {/* ---------------------------------------------------- */}
        <HeaderList title="My Orders" />
        <View style={styles.myOrder}>
          <TouchableOpacity style={styles.myOrderButton}>
            <Text style={styles.textMyOrder}>To pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myOrderButton}>
            <Image
              source={IconNotificationLight}
              style={{
                width: 14,
                height: 14,
                alignSelf: 'center',
              }}
              containerStyle={{position: 'absolute', top: -2, right: -2}}
            />
            <Text style={styles.textMyOrder}>To Recieve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myOrderButton}>
            <Text style={styles.textMyOrder}>To Review</Text>
          </TouchableOpacity>
        </View>
        {/* ---------------------------------------------------- */}
        <HeaderList title="Stories" />
        <FlatList
          scrollEventThrottle={6}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
            paddingBottom: 16,
          }}
          data={RecentlyViewedData}
          renderItem={({item}) => {
            return <StoryItem data={item} />;
          }}
        />
        {/* ---------------------------------------------------- */}
        <HeaderList
          title="New Items"
          isHaveButton
          onPress={() => {
            console.log('New Items');
          }}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
            paddingBottom: 16,
          }}
          data={RecentlyViewedData}
          renderItem={({item}) => {
            return <NewItem data={item} />;
          }}
        />
        {/* ---------------------------------------------------- */}
        <HeaderList
          title="Most Popular"
          isHaveButton
          onPress={() => {
            console.log('Most Popular');
          }}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 8,
            paddingBottom: 16,
          }}
          data={RecentlyViewedData}
          renderItem={({item}) => {
            return <MostPopularItem data={item} />;
          }}
        />
        {/* ---------------------------------------------------- */}
        <HeaderList
          title="Categories"
          isHaveButton
          onPress={() => {
            console.log('Categories');
          }}
        />

        <FlatList
          data={CategoriesResponse.slice(0, 4)}
          keyExtractor={(item, index) => index.toString() + item.name}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
          contentContainerStyle={{
            flexDirection: 'column',
            paddingHorizontal: 16,
            paddingBottom: 16,
            gap: 5,
          }}
          renderItem={({item}) => {
            return <CategoriesBox data={item} />;
          }}
        />

        {/* ---------------------------------------------------- */}
        <FlashSaleList data={flashSaleItems} />

        {/* ---------------------------------------------------- */}
        <HeaderList
          title="Just For You"
          onPress={() => {
            console.log('Just For You');
          }}
          leftComponent={
            <Image source={IconStar} style={{width: 14, height: 14}} />
          }
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 5,
            paddingBottom: 16,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 10,
          }}
          data={RecentlyViewedData}
          renderItem={({item}) => {
            return <NewItem data={item} numbItemPerRow={2} />;
          }}
        />
      </ScrollView>
    </AppWrapper>
  );
};

export default HomeScreen;
