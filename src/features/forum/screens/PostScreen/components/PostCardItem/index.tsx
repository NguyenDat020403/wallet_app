import {PostMediaView, UserHeaderInfo} from '@/features/forum/components';
import {Post} from '@/features/forum/redux/RTKQuery/types';
import React, {memo, SetStateAction, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useStyles from './styles';
import {useLikePostMutation} from '@/features/forum/redux/RTKQuery';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AppImage} from '@/components';
import {IconComment, IconLike, IconLikeActive} from '@/assets/icons';
import {navigate} from '@/navigation/RootNavigation';

interface PostCardProps {
  item: Post;
  onPressComment: (postId: string, onCommentSuccess: () => void) => void;
  setIsVisible?: React.Dispatch<SetStateAction<boolean>>;
}

const PostCard: React.FC<PostCardProps> = ({
  item,
  onPressComment,
  setIsVisible,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();

  const [likePost] = useLikePostMutation();

  const [iconLike, setIconLike] = useState(item.isCurrentUserLike);
  const [likeCount, setLikeCount] = useState(item.likeCount);
  const [commentCount, setCommentCount] = useState(item.commentCount);

  const ListActionBottom = [
    {
      icon: iconLike ? IconLikeActive : IconLike,
      title: 'Like',
    },
    {
      icon: IconComment,
      title: 'Comment',
    },
  ];
  const itemWith =
    (safeAreaInsets.screenWidth - 32) / ListActionBottom.length - 4;

  const handleActionPress = (title: string) => {
    if (title === 'Comment') {
      onPressComment(item.post_id, () => {
        setCommentCount(pre => pre + 1);
      });
    } else if (title === 'Like') {
      setIconLike(prev => !prev);
      setLikeCount(prev => (iconLike ? Math.max(prev - 1, 0) : prev + 1));
      likePost({post_id: item.post_id});
    }
  };

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          gap: 8,
          width: safeAreaInsets.screenWidth,
        }}>
        <UserHeaderInfo
          postId={item.post_id}
          id={item.user.user_id}
          name={item.user.username}
          avatar={item.user.avatar}
          created_at={item.created_at}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigate('PostDetailScreen', {data: item});
          }}
          style={{gap: 8}}>
          <Text style={styles.textBody1Regular} numberOfLines={4}>
            {item.content}
          </Text>
          <PostMediaView resource={item.images} />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <View style={{flexDirection: 'row', gap: 12}}>
          <Text style={styles.textCap1}>
            {likeCount <= 1 ? likeCount + ' like' : likeCount + ' likes'}
          </Text>
          <Text style={styles.textCap1}>
            {commentCount <= 1
              ? commentCount + ' comment'
              : commentCount + ' comments'}
          </Text>
        </View>
        <View style={styles.bottomPost}>
          {ListActionBottom.map((actionItem, index) => {
            return (
              <TouchableOpacity
                key={index}
                hitSlop={20}
                onPress={() => {
                  handleActionPress(actionItem.title);
                }}
                style={[styles.action, {width: itemWith}]}>
                <AppImage
                  haveDefault={false}
                  source={actionItem.icon}
                  style={{width: 20, height: 20}}
                />
                <Text style={styles.textCap1}>{actionItem.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default memo(PostCard);
