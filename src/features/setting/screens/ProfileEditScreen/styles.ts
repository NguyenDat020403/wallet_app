import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'space-between',
  },
  textCap1: {
    ...typography.caption1,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textBody1Bold: {
    ...typography.body1Bold,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
}));

export default useStyles;
