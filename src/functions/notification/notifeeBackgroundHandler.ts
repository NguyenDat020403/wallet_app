import notifee, {EventType} from '@notifee/react-native';
import {navigate} from '@/navigation/RootNavigation';

notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('[Notifee][BackgroundEvent]', type, detail);

  if (type === EventType.PRESS) {
    const data = detail.notification?.data;
    if (data?.userId && data?.postId) {
      setTimeout(() => {
        navigate('PostDetailScreen', {
          userId: data.userId.toString(),
          postId: data.postId.toString(),
        });
      }, 1000);
    }
  }
});
