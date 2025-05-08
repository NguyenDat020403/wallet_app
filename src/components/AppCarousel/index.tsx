import {useSafeAreaInsetsWindowDimension} from '@/hooks';
import {Image} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {parallaxLayout} from './function';

type AppCarouselProps = {
  data: any;
};

const AppCarousel: React.FC<AppCarouselProps> = ({data}) => {
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const PAGE_WIDTH = safeAreaInsets.screenWidth;

  return (
    <Carousel
      loop={true}
      pagingEnabled={true}
      autoPlay={true}
      autoPlayInterval={100}
      style={{
        marginHorizontal: -16,
        width: safeAreaInsets.screenWidth,
        height: 80,
        justifyContent: 'center',
      }}
      width={PAGE_WIDTH / 3}
      data={data}
      renderItem={({item}) => {
        return (
          <View
            style={{
              width: PAGE_WIDTH / 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={item!} style={{width: 60, height: 60}} />
          </View>
        );
      }}
      customAnimation={parallaxLayout(
        {
          size: PAGE_WIDTH / 3,
          vertical: false,
        },
        {
          parallaxScrollingScale: 1,
          parallaxAdjacentItemScale: 0.7,
          parallaxScrollingOffset: 40,
        },
      )}
      scrollAnimationDuration={1200}
    />
  );
};
export default AppCarousel;
