import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import AppHeader from '@/components/AppHeader';
import {
  CommentBottomSheet,
  CommentInputBar,
  PostMediaView,
  UserHeaderInfo,
} from '../../components';
import {AppBottomSheetModal} from '@/components';
import {useAppSelector} from '@/redux/hooks';
import {Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {MediaShow} from './components';
import {Post} from '../../redux/RTKQuery/types';
import {useGetPostMutation} from '../../redux/RTKQuery';

interface PostDetailScreenProps
  extends MainStackScreenProps<'PostDetailScreen'> {}

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);
  const [getPost] = useGetPostMutation();
  const [dataPost, setData] = useState<Post>();
  useEffect(() => {
    const fetchPost = async () => {
      const {data, postId, userId} = route.params || {};
      if (data) {
        setData(data);
      } else if (postId && userId) {
        try {
          const post = await getPost({
            postId: postId,
            userId: userId,
          }).unwrap();
          setData(post);
        } catch (error) {
          console.error('Failed to fetch post:', error);
        }
      }
    };

    fetchPost();
    console.log(route.params);
  }, []);
  useEffect(() => {
    console.log('load post detail');
  }, [dataPost]);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMedia, setIsVisibleMedia] = useState(false);
  return (
    <>
      <AppWrapper>
        <AppHeader style={{paddingHorizontal: 16}} title="Post Detail" />
        {dataPost && (
          <View style={styles.container}>
            <UserHeaderInfo
              isGoBack={true}
              id={dataPost.user.user_id}
              name={dataPost.user.username}
              avatar={dataPost.user.avatar}
              postId={dataPost.post_id}
            />
            <ScrollView
              style={{marginTop: 16}}
              contentContainerStyle={{gap: 16}}>
              <Text style={styles.textBody1Regular}>{dataPost.content}</Text>
              <TouchableOpacity
                onPress={() => {
                  console.log('xem anh');
                  setIsVisibleMedia(true);
                }}>
                <PostMediaView resource={dataPost.images} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
        <View style={[styles.footer, {paddingBottom: 12}]}>
          <TouchableOpacity
            style={styles.commentBox}
            onPress={() => {
              setIsVisible(true);
            }}>
            <Text style={styles.placeholderText}>Comment...</Text>
          </TouchableOpacity>
        </View>
        {dataPost && (
          <>
            <CommentBottomSheet
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              post_id={dataPost.post_id}
            />
            <MediaShow
              data={dataPost.images}
              isVisible={isVisibleMedia}
              setIsVisible={setIsVisibleMedia}
            />
          </>
        )}
      </AppWrapper>
    </>
  );
};

export default PostDetailScreen;
