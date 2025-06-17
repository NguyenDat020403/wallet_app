import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppDialog, AppImage, AppWrapper} from '@/components';
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
import {useFocusEffect} from '@react-navigation/native';
import {ImageError} from '@/assets/images';

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
  const [getUserPosts, {data: dataPost, isLoading, isSuccess}] =
    useGetUserPostsMutation();
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
      isCurrentUser: isCurrentUser,
      title: 'Chat',
      icon: IconMessage,
      onPress: () => {
        navigation.navigate('UserChatDetailScreen', {
          userId: data?.user_id,
          userName: data?.username,
          avatar: data?.avatar,
        });
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

  useFocusEffect(
    useCallback(() => {
      fetchPosts(1);
    }, []),
  );

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
      scrollY.value,
      [150, 300],
      [0, 1],
      Extrapolation.EXTEND,
    );
    return {
      opacity,
      flexDirection: 'row',
      alignItems: 'center',
    };
  });
  const actionListStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 20],
      [1, 0],
      Extrapolation.EXTEND,
    );
    return {
      opacity,
      flexDirection: 'row',
      gap: 12,
    };
  });
  const avatarOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 200],
      [1, 0],
      Extrapolation.EXTEND,
    );
    return {
      opacity,
    };
  });
  const infoOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0],
      Extrapolation.EXTEND,
    );
    return {
      opacity,
      gap: 12,
      alignItems: 'center',
    };
  });
  const renderFooterList = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" color="#000" />;
    }

    if (posts.length > 0 && isSuccess) {
      return (
        <View
          style={{
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.textRegular, {textAlign: 'center'}]}>
            You've reached the end
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <AppWrapper style={{position: 'relative'}}>
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
      {posts.length > 0 && isSuccess && isCurrentUser && (
        <TouchableOpacity
          onPress={() => navigation.navigate('CreatePostScreen')}
          activeOpacity={0.7}
          style={styles.fab1}>
          <Icon
            type="feather"
            name="plus"
            color="#fff"
            iconStyle={{fontSize: 24}}
          />
        </TouchableOpacity>
      )}
      {data && (
        <>
          <Animated.View style={[styles.info, animatedHeaderStyle]}>
            <Animated.Image
              source={data.avatar ? {uri: data.avatar} : ImageError}
              style={[styles.avatar, animatedAvatarStyle, avatarOpacityStyle]}
            />
            <Animated.View style={infoOpacityStyle}>
              <Text style={styles.name} numberOfLines={1}>
                {data?.username}
              </Text>
              <Text style={styles.email} numberOfLines={1}>
                Email: {data.email}
              </Text>
              <Text style={styles.bio} numberOfLines={1}>
                {data.bio || 'Nothing here.'}
              </Text>
            </Animated.View>

            <Animated.View style={[actionListStyle]}>
              {ListAction.filter(item => !item.isCurrentUser).map(item => {
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
            </Animated.View>
          </Animated.View>
          <Animated.FlatList
            style={{backgroundColor: '#FFF'}}
            onScroll={scrollHandler}
            nestedScrollEnabled
            contentContainerStyle={{
              paddingTop: 300,
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            ListEmptyComponent={
              isSuccess &&
              posts.length === 0 && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('CreatePostScreen')}
                  activeOpacity={0.7}
                  style={styles.fab}>
                  <View>
                    <Text
                      style={[
                        styles.textRegular,
                        {
                          textAlign: 'center',
                        },
                      ]}>
                      It looks like you haven't posted anything yet.
                    </Text>
                    <Text
                      style={[
                        styles.textRegular,
                        {
                          textAlign: 'center',
                        },
                      ]}>
                      Tap here to create your first post.
                    </Text>
                  </View>
                  <Icon type="feather" name="plus" iconStyle={{fontSize: 20}} />
                </TouchableOpacity>
              )
            }
            keyExtractor={item => item.post_id.toString()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooterList}
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
