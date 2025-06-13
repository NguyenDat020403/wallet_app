import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextInput,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import AppWrapper from '@/components/AppWrapper';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import AppHeader from '@/components/AppHeader';
import {
  useGetDetailChatMutation,
  useSendMessageMutation,
} from '../../redux/RTKQuery';
import {useAppSelector} from '@/redux/hooks';
import {ChatDetailResponse} from '../../redux/RTKQuery/types';
import {AppImage, AppTextInput} from '@/components';
import {Icon} from '@rneui/base';
import {useForm} from 'react-hook-form';
// const fakeChatDetailResponse: ChatDetailResponse = {
//   messages: [
//     {
//       message_id: 'm1',
//       sender_id: '5e852ffc-2209-4fa6-89fa-3c6f5955ea63', // chính mình
//       receiver_id: 'aa',
//       content:
//         "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       created_at: '2025-06-13T08:30:00Z',
//       updated_at: '2025-06-13T08:30:00Z',
//       deleted_at: '',
//     },
//     {
//       message_id: 'm2',
//       sender_id: 'u2', // người khác
//       receiver_id: 'u1',
//       content:
//         "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       created_at: '2025-06-13T08:31:00Z',
//       updated_at: '2025-06-13T08:31:00Z',
//       deleted_at: '',
//     },
//     {
//       message_id: 'm3',
//       sender_id: '5e852ffc-2209-4fa6-89fa-3c6f5955ea63',
//       receiver_id: 'u2',
//       content:
//         "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       created_at: '2025-06-13T08:32:00Z',
//       updated_at: '2025-06-13T08:32:00Z',
//       deleted_at: '',
//     },
//     {
//       message_id: 'm4',
//       sender_id: 'u2',
//       receiver_id: 'u1',
//       content:
//         "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//       created_at: '2025-06-13T08:33:00Z',
//       updated_at: '2025-06-13T08:33:00Z',
//       deleted_at: '',
//     },
//   ],
//   total: 4,
//   page: 1,
//   limit: 10,
//   totalPages: 1,
// };
interface UserChatDetailScreenProps
  extends MainStackScreenProps<'UserChatDetailScreen'> {}

const UserChatDetailScreen: React.FC<UserChatDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const styles = useStyles(safeAreaInsets);
  const {currentUser} = useAppSelector(state => state.authReducer);
  const [getDetailChat, {isLoading}] = useGetDetailChatMutation();
  const [sendMessage] = useSendMessageMutation();
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const limit = 20;
  const [data, setData] = useState<ChatDetailResponse>();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDetailChat({
        otherUserId: route.params.userId,
        limit: limit,
        page: 1,
      }).unwrap();
      if (result) {
        setData(result);
      }
    };
    fetchData();
  }, []);

  const fetchMoreMessages = async () => {
    if (loadingMore || !data || page >= data.totalPages) {
      return;
    }

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const result = await getDetailChat({
        otherUserId: route.params.userId,
        limit,
        page: nextPage,
      }).unwrap();

      if (result) {
        setData(prev => {
          if (!prev) {
            return result;
          }

          return {
            ...result,
            messages: [...prev.messages, ...result.messages], // prepend
          };
        });
        setPage(nextPage);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const {control, handleSubmit, setValue} = useForm<{
    message: string;
  }>({
    defaultValues: {
      message: '',
    },
  });

  const handleSendMessage = async (body: {message: string}) => {
    const message = await sendMessage({
      sender_id: currentUser.user_id || '',
      receiver_id: route.params.userId,
      content: body.message,
    }).unwrap();
    if (message) {
      setValue('message', '');
      setData(prev => {
        if (prev) {
          return {
            ...prev,
            messages: [message, ...prev.messages],
          };
        } else {
          return {
            messages: [message],
            total: 1,
            page: 1,
            limit: 10,
            totalPages: 1,
          };
        }
      });

      flatListRef.current?.scrollToIndex({index: 0, animated: true});
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0 && !isLoading) {
      fetchMoreMessages();
    }
  };
  return (
    <AppWrapper>
      <AppHeader
        style={{paddingHorizontal: 16}}
        midComponent={
          <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
            <AppImage
              source={{uri: route.params.avatar}}
              style={{width: 24, height: 24, borderRadius: 150}}
            />
            <Text style={styles.textBody1Regular}>{route.params.userName}</Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity>
            <Icon
              type="feather"
              name="more-horizontal"
              iconStyle={{fontSize: 16}}
            />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={data?.messages}
          onScrollEndDrag={fetchMoreMessages}
          inverted={true}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          //   data={fakeChatDetailResponse.messages}
          contentContainerStyle={{gap: 12}}
          keyExtractor={(item, index) => item.message_id}
          ListHeaderComponent={
            isLoading ? (
              <View style={{paddingVertical: 10, alignItems: 'center'}}>
                <ActivityIndicator size="small" color="#888" />
              </View>
            ) : null
          }
          renderItem={({item}) => {
            const isCurrentUser = item.sender_id === currentUser.user_id;

            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                  backgroundColor: isCurrentUser ? '#dcf8c6' : '#efefef',
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                  borderRadius: 12,
                  maxWidth: safeAreaInsets.screenWidth - 32 - 50,
                  borderBottomRightRadius: isCurrentUser ? 0 : 16,
                  borderBottomLeftRadius: isCurrentUser ? 16 : 0,
                }}>
                <Text style={[styles.textBody1Regular, {flexWrap: 'wrap'}]}>
                  {item.content}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={16 + 16 + 60}>
          <View>
            <AppTextInput
              placeholder="Send message"
              key={'message'}
              name="message"
              control={control}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', gap: 8}}>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                  <Icon
                    color={'#000'}
                    type="feather"
                    name="camera"
                    iconStyle={{fontSize: 20}}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                  <Icon
                    color={'#000'}
                    type="feather"
                    name="smile"
                    iconStyle={{fontSize: 20}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => {
                  handleSubmit(handleSendMessage)();
                }}>
                <Icon
                  color={'#000'}
                  type="feather"
                  name="send"
                  iconStyle={{fontSize: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </AppWrapper>
  );
};

export default UserChatDetailScreen;
