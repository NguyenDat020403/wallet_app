import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16},
  textBody3Regular: {...typography.body3Regular},
  textBody2Regular: {...typography.body2Regular, opacity: 0.6},
  textBody2Medium: {...typography.body2Medium},
  textBody2SemiBold: {...typography.body2SemiBold},
  textCap1: {...typography.caption1, textAlign: 'center'},
  textBody1Regular: {...typography.body1Regular},
  textHeading2: {...typography.heading2},
  textHeading3: {...typography.heading3Bold},
  textHeading5: {...typography.heading5},
  divider: {
    marginVertical: 16,
    height: 1,
    marginHorizontal: -16,
    width: insets.screenWidth,
    backgroundColor: '#333333',
  },
  itemFee: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
}));

export default useStyles;
