import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {useGetListPostMutation} from '../../redux/RTKQuery';
import {CommentBottomSheet} from '../../components';
import {AppImage} from '@/components';
import {useAppSelector} from '@/redux/hooks';
import {AppIcon, IconWarning} from '@/assets/icons';
import {Icon, Image} from '@rneui/base';
import {Post} from '../../redux/RTKQuery/types';
import PostCardItem from './components/PostCardItem';
import {View} from 'react-native';

interface PostScreenProps extends MainStackScreenProps<'PostScreen'> {}

const PostScreen: React.FC<PostScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const {currentUser} = useAppSelector(state => state.authReducer);
  const {postDeletedId} = useAppSelector(state => state.forumReducer);

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [postId, setPostId] = useState('');
  const onCommentSuccessRef = useRef<() => void>(() => {});

  const [getListPost, {data, isLoading}] = useGetListPostMutation();

  const fetchPosts = async (currentPage: number) => {
    const response: Post[] = await getListPost({
      page: currentPage,
      limit: 10,
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
    ({item}) => (
      <PostCardItem
        item={item}
        onPressComment={handleOpenComment}
        setIsVisible={setIsVisible}
      />
    ),
    [],
  );

  return (
    <AppWrapper style={{position: 'relative'}}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <AppImage
            source={AppIcon}
            haveDefault={false}
            style={styles.iconImage}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen', {userId: currentUser.user_id});
          }}
          style={styles.userSection}>
          <AppImage
            source={{uri: currentUser.avatar}}
            haveDefault={false}
            style={styles.avatar}
          />
          <Text numberOfLines={1} style={styles.textBody1Regular}>
            {currentUser.username}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePostScreen')}
        activeOpacity={0.7}
        style={styles.fab}>
        <Icon
          type="feather"
          name="plus"
          color="#fff"
          iconStyle={{fontSize: 24}}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          keyExtractor={item => item.post_id.toString()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="small" color="#000" /> : null
          }
          refreshing={isLoading || refreshing}
          onRefresh={onRefresh}
          data={posts}
          ListEmptyComponent={
            <View style={styles.noTokenContainer}>
              <Icon type="feather" name="x" iconStyle={{fontSize: 20}} />
              <Text style={styles.textBody3Regular}>No post found</Text>
            </View>
          }
          renderItem={renderItem}
        />
      </View>
      <CommentBottomSheet
        onCommentSuccess={() => {
          onCommentSuccessRef.current();
        }}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        post_id={postId}
      />
    </AppWrapper>
  );
};

export default PostScreen;
