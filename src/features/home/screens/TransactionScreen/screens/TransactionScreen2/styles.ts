import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginTop: 80,
  },
  textBody3Regular: {...typography.body3Regular},
  textBody2Regular: {...typography.body2Regular, opacity: 0.6},
  textBody2Medium: {...typography.body2Medium},
  textBody1Medium: {...typography.body1Medium},
  textBody2SemiBold: {...typography.body2SemiBold},
  textCap1: {...typography.caption1, textAlign: 'center'},
  textBody1Regular: {...typography.body1Regular},
  textHeading1: {...typography.heading1},
  boardNumber: {
    alignItems: 'center',
    paddingVertical: 24,
    width: (insets.screenWidth - 32 - 10) / 3,
    marginRight: 5,
  },
}));

export default useStyles;
