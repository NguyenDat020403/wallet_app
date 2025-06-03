import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF', paddingVertical: 16},
  textCap1: {...typography.caption1},
  textBody1Regular: {...typography.body1Regular},
  textHeading2: {...typography.heading2},
  divider: {
    height: 1,
    width: insets.screenWidth,
    backgroundColor: '#0000003',
  },
  tokenInfo: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 12,
    alignSelf: 'center',
  },
  noDataView: {
    height: 40,
    width: 80,
    backgroundColor: '#0000003',
    borderRadius: 8,
  },
}));
export default useStyles;
