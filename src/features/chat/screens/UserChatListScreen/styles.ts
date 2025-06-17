import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
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
  noTokenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingTop: 16,
  },
}));

export default useStyles;
