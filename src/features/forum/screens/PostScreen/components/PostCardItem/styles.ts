import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingBottom: 60,
  },
  textCap1: {
    ...typography.caption1,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },

  divider: {
    height: 0.5,
    width: insets.screenWidth,
    backgroundColor: '#b3b3b3',
  },
  bottomPost: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 12,
    paddingTop: 4,
    alignSelf: 'center',
  },
}));

export default useStyles;
