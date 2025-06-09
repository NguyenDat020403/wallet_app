import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import AppHeader from '@/components/AppHeader';
import {
  useGetCommentsPostMutation,
  useGetListPostMutation,
} from '../../redux/RTKQuery';
import {PostMediaView, UserHeaderInfo} from '../../components';
import {AppBottomSheetModal, AppImage} from '@/components';
import {useAppSelector} from '@/redux/hooks';
import {IconPicture} from '@/assets/icons';
import {Icon} from '@rneui/base';
import {Post} from '../../redux/RTKQuery/types';
import PostCardItem from './components/PostCardItem';

interface PostScreenProps extends MainStackScreenProps<'PostScreen'> {}

const PostScreen: React.FC<PostScreenProps> = ({navigation}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const {currentUser} = useAppSelector(state => state.authReducer);

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [getListPost, {data, isLoading}] = useGetListPostMutation();
  const [getComments, {data: listComment, isLoading: commentLoading}] =
    useGetCommentsPostMutation();

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
    console.log(data);
  }, [data]);
  const [refreshing, setRefreshing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
  const handleOpenComment = (postId: string) => {
    setIsVisible(true);
    getComments({
      postId: postId,
      limit: 10,
      page: 1,
    });
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
    <AppWrapper>
      <AppHeader style={{paddingHorizontal: 16}} title="Post" />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreatePostScreen');
        }}
        activeOpacity={0.7}
        style={styles.createPost}>
        <View
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
          }}>
          <AppImage
            source={{uri: currentUser.avatar}}
            type="AVATAR"
            style={{width: 32, height: 32}}
          />
          <Text style={styles.textBody1Regular}>Got any news?</Text>
        </View>
        <Icon
          type="feather"
          name="image"
          iconStyle={{fontSize: 16}}
          color={'#000'}
        />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.divider} />
        <FlatList
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size="small" color="#000" /> : null
          }
          refreshing={isLoading || refreshing}
          onRefresh={onRefresh}
          data={posts}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() => {
            return <Text style={styles.textBody1Regular}> No data </Text>;
          }}
          renderItem={renderItem}
        />
      </View>
      <AppBottomSheetModal
        snapPoints={['70%', '100%']}
        isVisible={isVisible}
        setIsVisible={setIsVisible}>
        <AppHeader
          leftComponent={<Text style={styles.textCap1}>123k likes</Text>}
          rightComponent={
            <TouchableOpacity
              hitSlop={20}
              onPress={() => {
                setIsVisible(false);
              }}
              style={{padding: 4}}>
              <Icon type="feather" name="x" iconStyle={{fontSize: 16}} />
            </TouchableOpacity>
          }
        />
        <View></View>
      </AppBottomSheetModal>
    </AppWrapper>
  );
};

export default PostScreen;
