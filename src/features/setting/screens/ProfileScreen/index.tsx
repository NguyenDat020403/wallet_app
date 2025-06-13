import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppImage, AppWrapper} from '@/components';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppHeader from '@/components/AppHeader';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {ImageAvatar} from '@/features/auth/assets/images';
import {BackgroundImage, Icon} from '@rneui/base';
import {
  useGetUserMutation,
  useGetUserPostsMutation,
  useGetUserWalletNetworkMutation,
} from '../../redux/RTKQuery';
import {useAppSelector} from '@/redux/hooks';
import {UserResponse} from '@/features/auth/redux/RTKQuery/types';
import {ScrollView} from 'react-native';
import {Text} from 'react-native';
import {
  IconMessage,
  IconSend,
  IconSendProfile,
  IconWalletInfo,
} from '@/assets/icons';
import PostCardItem from '@/features/forum/screens/PostScreen/components/PostCardItem';
import {Post} from '#/src/features/forum/redux/RTKQuery/types';
import {CommentBottomSheet} from '@/features/forum/components';
import {AddressBottomSheet} from './components';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const HEADER_MAX_HEIGHT = 300;
const AVATAR_MAX_SIZE = 120;
const AVATAR_MIN_SIZE = 40;

interface ProfileScreenProps extends MainStackScreenProps<'ProfileScreen'> {}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation, route}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const userId = route.params.userId;
  const {currentUser} = useAppSelector(state => state.authReducer);
  const {postDeletedId} = useAppSelector(state => state.forumReducer);

  const isCurrentUser = currentUser.user_id === userId;
  const [getUserInfo, {data: dataUser}] = useGetUserMutation();
  const [getUserPosts, {data: dataPost, isLoading}] = useGetUserPostsMutation();
  const [getUserWalletNetwork, {data: dataWallet}] =
    useGetUserWalletNetworkMutation();
  const [data, setData] = useState<UserResponse>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleAddress, setIsVisibleAddress] = useState(false);
  const [postId, setPostId] = useState('');
  const onCommentSuccessRef = useRef<() => void>(() => {});

  useEffect(() => {
    const fetchUser = async () => {
      if (isCurrentUser) {
        setData(currentUser);
      } else {
        const response = await getUserInfo({userId}).unwrap();
        setData(response);
      }
    };
    getUserWalletNetwork({userId: userId});
    fetchUser();
  }, [userId, isCurrentUser, getUserInfo, currentUser]);

  const ListAction = [
    {
      title: 'Chat',
      icon: IconMessage,
      onPress: () => {
        console.log('chat');
      },
    },
    {
      title: 'Wallet',
      icon: IconWalletInfo,
      onPress: () => {
        console.log('wallet');
        setIsVisibleAddress(true);
      },
    },
    {
      title: 'Send',
      icon: IconSendProfile,
      onPress: () => {
        console.log('send');
      },
    },
  ];

  const fetchPosts = async (currentPage: number) => {
    const response: Post[] = await getUserPosts({
      page: 1,
      limit: 10,
      userId: userId,
    }).unwrap();

    if (response.length === 0 || response.length < 10) {
      setHasMore(false);
    }

    if (currentPage === 1) {
      setPosts(response); // Load đầu tiên
    } else {
      setPosts(prev => [...prev, ...response]); // Load tiếp
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  useEffect(() => {
    if (postDeletedId) {
      setPosts(pre => {
        if (pre) {
          return pre.filter(post => post.post_id !== postDeletedId);
        }
        return pre;
      });
    }
  }, [postDeletedId]);

  const onRefresh = async () => {
    fetchPosts(1);
  };
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      fetchPosts(nextPage);
      setPage(nextPage);
    }
  };

  const handleOpenComment = (
    postIdPress: string,
    onCommentSuccess: () => void,
  ) => {
    setIsVisible(true);
    setPostId(postIdPress);
    onCommentSuccessRef.current = onCommentSuccess;
  };
  const renderItem = useCallback(
    ({item}) => <PostCardItem item={item} onPressComment={handleOpenComment} />,
    [],
  );
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedAvatarStyle = useAnimatedStyle(() => {
    const size = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT],
      [AVATAR_MAX_SIZE, AVATAR_MIN_SIZE],
      Extrapolation.CLAMP,
    );
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
    };
  });
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT],
      [HEADER_MAX_HEIGHT, 0],
      Extrapolation.CLAMP,
    );
    return {
      height,
    };
  });
  const showSmallAvatarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value - 250,
      [0, 100],
      [0, 1],
      Extrapolation.EXTEND,
    );
    return {
      opacity,
      flexDirection: 'row',
      alignItems: 'center',
    };
  });
  return (
    <AppWrapper>
      <AppHeader
        midComponent={
          <Animated.View style={showSmallAvatarStyle}>
            <AppImage
              source={{uri: data?.avatar}}
              style={{width: 24, height: 24, borderRadius: 12, marginRight: 8}}
            />
            <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 16}}>
              {data?.username}
            </Text>
          </Animated.View>
        }
        rightComponent={
          <>
            {isCurrentUser && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProfileEditScreen');
                }}>
                <Icon
                  type="feather"
                  name="settings"
                  iconStyle={{fontSize: 16}}
                  color={'#000'}
                />
              </TouchableOpacity>
            )}
          </>
        }
      />
      {data && (
        <>
          <Animated.View style={[styles.info, animatedHeaderStyle]}>
            <Animated.Image
              source={{uri: data.avatar}}
              style={[styles.avatar, animatedAvatarStyle]}
            />
            <Text style={styles.name} numberOfLines={1}>
              {data?.username}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              Email: {data.email}
            </Text>
            <Text style={styles.bio} numberOfLines={2}>
              {data.bio || 'Nothing here.'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 12,
              }}>
              {ListAction.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.action}
                    onPress={item.onPress}>
                    <AppImage
                      haveDefault={false}
                      source={item.icon}
                      style={{width: 24, height: 24}}
                    />
                    <Text style={styles.textRegular}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Animated.View>
          <Animated.FlatList
            style={{backgroundColor: '#FFF'}}
            onScroll={scrollHandler}
            nestedScrollEnabled
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            keyExtractor={item => item.post_id.toString()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoading ? <ActivityIndicator size="small" color="#000" /> : null
            }
            refreshing={isLoading}
            onRefresh={onRefresh}
            data={posts}
            renderItem={renderItem}
          />
          <CommentBottomSheet
            onCommentSuccess={() => {
              onCommentSuccessRef.current();
            }}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            post_id={postId}
          />
          <AddressBottomSheet
            isVisible={isVisibleAddress}
            setIsVisible={setIsVisibleAddress}
            data={dataWallet}
          />
        </>
      )}
    </AppWrapper>
  );
};

export default ProfileScreen;
