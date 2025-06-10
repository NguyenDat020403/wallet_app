import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AppBottomSheetModal, AppHeader, AppImage} from '@/components';
import {Icon} from '@rneui/base';
import {FlatList} from 'react-native-gesture-handler';
import {Comment} from '../../redux/RTKQuery/types';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {
  useCommentPostMutation,
  useGetCommentsPostMutation,
  useLikeCommentMutation,
} from '../../redux/RTKQuery';
import {convertDate} from '@/functions/convertDate/functions';
import useStyles from './styles';

type CommentBottomSheetProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  post_id: string;
};

const CommentBottomSheet: React.FC<CommentBottomSheetProps> = ({
  post_id,
  isVisible,
  setIsVisible,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);

  const [commentPost, {data: commentData}] = useCommentPostMutation();
  const [getComments, {data: data, isLoading: commentLoading}] =
    useGetCommentsPostMutation();
  const [likeComment] = useLikeCommentMutation();

  const [commentText, setCommentText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [listComment, setListComment] = useState<Comment[]>();
  useEffect(() => {
    getComments({
      postId: post_id,
      limit: 20,
      page: 1,
    });
  }, []);

  useEffect(() => {
    setListComment(data);
  }, [data]);
  useEffect(() => {
    if (commentData) {
      setListComment(pre => {
        if (pre) {
          return [commentData, ...pre];
        } else {
          return [commentData];
        }
      });
      setCommentText('');
      Keyboard.dismiss();
    }
  }, [commentData]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const handleComment = (postId: string) => {
    commentPost({
      post_id: postId,
      content: commentText,
    });
  };
  return (
    <AppBottomSheetModal
      snapPoints={['100%']}
      isVisible={isVisible}
      setIsVisible={setIsVisible}>
      <View style={{flex: 1}}>
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
        <FlatList
          data={listComment}
          contentContainerStyle={{gap: 12}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'flex-start',
                  paddingHorizontal: 16,
                }}>
                <AppImage
                  source={{uri: item.user.avatar}}
                  style={styles.avatar}
                />
                <View
                  style={{
                    gap: 4,
                    width: safeAreaInsets.screenWidth - 32 - 40 - 8,
                  }}>
                  <Text>{item.user.username}</Text>
                  <Text>{item.content}</Text>
                  <View style={{flexDirection: 'row', gap: 8}}>
                    <Text style={styles.textCap1}>
                      {convertDate(item.created_at)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setListComment(prev =>
                          prev?.map(comment =>
                            comment.comment_id === item.comment_id
                              ? {
                                  ...comment,
                                  isCurrentUserLike: !comment.isCurrentUserLike,
                                }
                              : comment,
                          ),
                        );
                        likeComment({comment_id: item.comment_id});
                      }}>
                      <Text
                        style={[
                          styles.textCap1,
                          {
                            color: item.isCurrentUserLike
                              ? '#007AFF'
                              : '#b3b3b3',
                          },
                        ]}>
                        Like
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View
          style={{
            paddingBottom: safeAreaInsets.bottom + 16,
            paddingHorizontal: 16,
            paddingTop: 16,
            elevation: 2,
            zIndex: 1000,
            gap: 8,
            borderTopColor: '#5f5f5f',
          }}>
          <BottomSheetTextInput
            value={commentText}
            onChangeText={setCommentText}
            multiline={true}
            placeholder="Comment..."
            style={{
              backgroundColor: '#efefef',
              paddingLeft: 12,
              borderRadius: 8,
            }}
          />
          {(keyboardVisible || commentText.trim().length > 0) && (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', gap: 8}}>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                  <Icon
                    color={'#5f5f5f'}
                    type="feather"
                    name="camera"
                    iconStyle={{fontSize: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                  <Icon
                    color={'#5f5f5f'}
                    type="feather"
                    name="smile"
                    iconStyle={{fontSize: 20}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  handleComment(listComment[0].post_id);
                }}>
                <Icon
                  color={'#5f5f5f'}
                  type="feather"
                  name="send"
                  iconStyle={{fontSize: 20}}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </AppBottomSheetModal>
  );
};

export default CommentBottomSheet;
