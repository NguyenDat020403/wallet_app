import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#0F0F0F'},
  textBody3Regular: {...typography.body3Regular},
  textBody2Regular: {...typography.body2Regular, opacity: 0.6},
  textBody2Medium: {...typography.body2Medium},
  textBody2SemiBold: {...typography.body2SemiBold},
  textCap1: {...typography.caption1, textAlign: 'center'},
  textBody1Regular: {...typography.body1Regular},
  textHeading1: {...typography.heading1},
  tabBar: {
    height: 4,
    borderRadius: 12,
    width: (insets.screenWidth - 32) / 5,
  },
}));

export default useStyles;
