import {PostMediaView, UserHeaderInfo} from '@/features/forum/components';
import {Post} from '@/features/forum/redux/RTKQuery/types';
import React, {memo, SetStateAction} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useStyles from './styles';
import {useGetCommentsPostMutation} from '@/features/forum/redux/RTKQuery';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Icon} from '@rneui/base';

interface PostCardProps {
  item: Post;
  onPressComment: (postId: string) => void;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const PostCard: React.FC<PostCardProps> = ({
  item,
  onPressComment,
  setIsVisible,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles();

  const ListActionBottom = [
    {
      icon: 'thumbs-up',
      title: 'Like',
    },
    {
      icon: 'message-square',
      title: 'Comment',
    },
  ];
  const itemWith =
    (safeAreaInsets.screenWidth - 32) / ListActionBottom.length - 4;
  return (
    <View>
      <View style={[styles.divider, {paddingTop: 2}]} />
      <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
        <UserHeaderInfo
          name={item.user.username}
          avatar={item.user.avatar}
          created_at={item.created_at}
        />
        <Text style={styles.textBody1Regular}>{item.content}</Text>
        <PostMediaView resource={item.images} />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <View style={{flexDirection: 'row', gap: 12}}>
          <Text style={styles.textCap1}>123k likes</Text>
          <Text style={styles.textCap1}>12 comments</Text>
        </View>
        <View style={styles.bottomPost}>
          {ListActionBottom.map((actionItem, index) => {
            return (
              <TouchableOpacity
                key={index}
                hitSlop={20}
                onPress={() => {
                  if (actionItem.title === 'Comment') {
                    onPressComment(item.post_id);
                  } else {
                    console.log('like');
                  }
                }}
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  flex: 1,
                  width: itemWith,
                  justifyContent: 'center',
                }}>
                <Icon
                  type="feather"
                  name={actionItem.icon}
                  iconStyle={{fontSize: 16}}
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

export default memo(PostCard); // ✅ Memo hóa
