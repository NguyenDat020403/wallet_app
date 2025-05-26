import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#0F0F0F', paddingVertical: 16},
  textCap1: {...typography.caption1},
  textBody1Regular: {...typography.body1Regular},
  textHeading2: {...typography.heading2},
  divider: {
    height: 1,
    width: insets.screenWidth,
    backgroundColor: '#333333',
  },
  tokenInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 12,
    alignSelf: 'center',
  },
}));
export default useStyles;
