import SimpleToast from 'react-native-simple-toast';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import type {AnimatedStyle} from 'react-native-reanimated';
import type {StyleProps} from 'react-native-reanimated';
export const showToastMessage = (message?: string) => {
  if (!message || message === '') {
    return;
  }
  SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast.BOTTOM);
};

type AnchorPoint = {x: number; y: number};
type Size = {width: number; height: number};

export function withAnchorPoint(
  style: AnimatedStyle<any>,
  anchorPoint: AnchorPoint,
  size: Size,
): AnimatedStyle<any> {
  'worklet';
  const {x, y} = anchorPoint;
  const {width, height} = size;

  const translateX = (0.5 - x) * width;
  const translateY = (0.5 - y) * height;

  const transform = style.transform ?? [];

  return {
    ...style,
    transform: [
      {translateX},
      {translateY},
      ...transform,
      {translateX: -translateX},
      {translateY: -translateY},
    ],
  };
}
