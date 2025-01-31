import React from 'react';
import {MainStackScreenProps} from '@/navigation/types';
import useStyles from './styles';
import {AppButton, AppWrapper} from '@/components';
import {
  demoStory1,
  demoStory2,
  demoStory3,
  ImageDemoStory,
} from '@/assets/images';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Image} from '@rneui/themed';
import {IconEyeOn, IconForward, IconLive} from '@/assets/icons';
import {Text} from 'react-native';
import {goBack} from '@/navigation/RootNavigation';
import {PanGestureHandler} from 'react-native-gesture-handler';

interface StoryScreenProps extends MainStackScreenProps<'StoryScreen'> {}

const StoryScreen: React.FC<StoryScreenProps> = ({navigation, route}) => {
  const styles = useStyles();
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();

  const IMAGE_SCALE_WIDTH = safeAreaInsets.screenWidth;
  const IMAGE_SCALE_HEIGHT =
    safeAreaInsets.screenHeight -
    safeAreaInsets.top -
    safeAreaInsets.bottom -
    60 -
    40 -
    32;
  const onSwipe = ({nativeEvent}) => {
    const {translationX, translationY} = nativeEvent;

    if (translationX > 50) {
      navigation.goBack();
    } else if (translationX < -50) {
      // navigation.navigate('NextScreen');
      console.log('Vuốt phải');
    } else if (translationY > 50) {
      console.log('Vuốt xuống');
    } else if (translationY < -50) {
      console.log('Vuốt lên');
    }
  };

  return (
    <AppWrapper>
      <PanGestureHandler
        onGestureEvent={onSwipe}
        onHandlerStateChange={onSwipe}>
        <ScrollView
          onScroll={() => {
            goBack;
          }}
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 16,
          }}>
          <TouchableOpacity activeOpacity={0.8}>
            <Image
              source={{
                uri: 'https://algonquinadventures.com/wallpaper/phones/StephenElms-SPWP-1.jpg',
              }}
              style={{
                width: IMAGE_SCALE_WIDTH,
                height: IMAGE_SCALE_HEIGHT,
              }}
              containerStyle={{borderRadius: 9}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              gap: 12,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 4,
              }}>
              <Image
                source={IconEyeOn}
                style={{width: 22, height: 18, resizeMode: 'cover'}}
              />
              <Text style={styles.textViews}>2,530</Text>
            </View>
            <Image
              source={IconLive}
              style={{width: 40, height: 18, resizeMode: 'cover'}}
            />
            <TouchableOpacity>
              <Image
                source={IconForward}
                style={{width: 25, height: 18, resizeMode: 'cover'}}
              />
            </TouchableOpacity>
            <AppButton
              title="Shop"
              buttonStyle={{
                flex: 1,
                paddingVertical: 6,
                marginHorizontal: 0,
              }}
              textStyle={styles.textButton}
            />
          </View>
        </ScrollView>
      </PanGestureHandler>
    </AppWrapper>
  );
};

export default StoryScreen;
