import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';
import {ScreenWidth} from '@rneui/base';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  textBody3Bold: {
    ...typography.body3Bold,
  },
  textBody1: {
    ...typography.body1Regular,
  },
  textCap1: {
    ...typography.caption1,
  },
  textCap1Bold: {
    ...typography.caption1,
    fontWeight: '700',
  },
  backgroundNetwork: {
    backgroundColor: '#b3b3b3',
    color: '#000',
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  divider: {
    height: 0.5,
    width: ScreenWidth - 32 - 48,
    backgroundColor: '#5f5f5f',
  },
}));

export default useStyles;
