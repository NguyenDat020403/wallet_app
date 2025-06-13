import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ItemChatResponse} from '@/features/chat/redux/RTKQuery/types';
import useStyles from './styles';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {AppImage} from '@/components';
import {useAppSelector} from '@/redux/hooks';
import {getRelativeTime} from '@/features/chat/functions/time';
import {navigate} from '@/navigation/RootNavigation';

type ChatItemProps = {
  data: ItemChatResponse;
};

const ChatItem: React.FC<ChatItemProps> = ({data}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);
  const isCurrentUserSend =
    data.lastMessage.sender.user_id === currentUser.user_id;
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('UserChatDetailScreen', {
          userId: data.user_id,
          userName: data.username,
          avatar: data.avatar || '',
        });
      }}
      activeOpacity={0.7}
      style={styles.container}>
      <AppImage source={{uri: data.avatar}} style={styles.avatar} />
      <View style={styles.body}>
        <Text style={styles.textBody1Bold}>{data.username}</Text>
        <View style={{flexDirection: 'row', flexWrap: 'nowrap'}}>
          <Text
            style={[styles.textBody1Regular, {flexShrink: 1}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {isCurrentUserSend && 'You: '}
            {data.lastMessage.content + ' '}
          </Text>
          <Text style={[styles.textBody1Regular, {color: '#b3b3b3'}]}>
            - {getRelativeTime(data.lastMessage.created_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
