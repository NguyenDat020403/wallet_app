import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {View} from 'react-native';
import {Text} from '@rneui/themed';
import useStyles from './styles';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {SharedValue} from 'react-native-reanimated';
import {useSafeAreaInsetsWindowDimension} from '@/hooks';
type AppBottomSheetModalProps = PropsWithChildren<{
  isVisible?: boolean;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundColor?: string;
  snapPoints?: (string | number)[];
  onChange?: (index: number) => void;
  autoSize?: boolean;
  footerComponent?: React.FC<BottomSheetFooterProps>;
  isTopInset?: boolean;
  isBottomInset?: boolean;
  // animatedPosition?: SharedValue<number>;
}>;
export type AppBottomSheetModalRef = {
  present: () => void;
  dismiss: () => void;
};
const AppBottomSheetModal: React.ForwardRefRenderFunction<
  AppBottomSheetModalRef,
  AppBottomSheetModalProps
> = (
  {
    children,
    snapPoints = ['70%'],
    onChange,
    isVisible,
    setIsVisible,
    autoSize,
    footerComponent,
    isBottomInset = false,
    // animatedPosition,
  },
  ref,
) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => bottomSheetModalRef.current!);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isVisible]);

  // variables
  const sheetSnapPoint = useMemo(() => snapPoints, [snapPoints]);
  const safeAreaInsets = useSafeAreaInsetsWindowDimension();
  const indexRef = useRef<number>(-1);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.8}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={autoSize ? undefined : sheetSnapPoint}
      footerComponent={footerComponent}
      enableDynamicSizing={autoSize}
      containerStyle={{zIndex: 10}}
      // animatedPosition={animatedPosition}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustPan"
      onChange={value => {
        indexRef.current = value;
        onChange && onChange(value);
        if (value === -1) {
          setIsVisible && setIsVisible(false);
        }
      }}
      topInset={safeAreaInsets.top}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{
        backgroundColor: '#000',
      }}>
      <BottomSheetView
        style={[
          {
            paddingBottom: isBottomInset ? safeAreaInsets.bottom : 0,
          },
          !autoSize && {flex: 1},
        ]}>
        <View style={[!autoSize && {flex: 1}]}>{children}</View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default React.forwardRef(AppBottomSheetModal);
