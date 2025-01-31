import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
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

interface HomeScreenProps extends MainStackScreenProps<'HomeScreen'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const isNotAuth = useAppSelector(state => state.authReducer.isAuthenticated);

  return (
    <AppWrapper>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.avatarAndShadow}>
            <Image
              source={{
                uri: 'https://photo.znews.vn/w660/Uploaded/neg_yslewlx/2023_01_09/avatar_2_reviews.jpg',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!isNotAuth) {
                navigate('LoginScreen');
              }
            }}
            style={{
              backgroundColor: '#004CFF',
              borderRadius: 18,
              height: 35,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                paddingHorizontal: 16,
              }}>
              My Activity
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.buttonHeaderRight}>
            <Image
              source={IconScan}
              style={{
                width: 20,
                height: 16,
                resizeMode: 'stretch',
              }}
              containerStyle={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHeaderRight}>
            <Image
              source={IconNotification}
              style={{
                width: 8,
                height: 8,
                resizeMode: 'stretch',
                alignSelf: 'center',
              }}
              containerStyle={{position: 'absolute', top: 0, right: 0}}
            />
            <Image
              source={IconTopMenu}
              style={{
                width: 11,
                height: 10,
                resizeMode: 'stretch',
              }}
              containerStyle={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHeaderRight}>
            <Image
              source={IconSetting}
              style={{
                width: 16,
                resizeMode: 'stretch',
                height: 16,
              }}
              containerStyle={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: 60, marginBottom: 60}}>
        {/* ---------------------------------------------------- */}
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.textWelcome}>Hello, Romina!</Text>
          <View style={styles.welcomeBody}>
            <Text style={styles.textTitle}>Announcement</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  width: safeAreaInsets.screenWidth - 30 - 24 - 32 - 16,
                }}
                numberOfLines={2}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas hendrerit luctus libero ac vulputate.
              </Text>
              <TouchableOpacity style={styles.iconArrowRight}>
                <Icon
                  type="antdesign"
                  name="arrowright"
                  size={14}
                  color="#FFFFFF"
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
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
