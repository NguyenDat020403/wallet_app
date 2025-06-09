import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF', padding: 16},
  textBody3Bold: {
    ...typography.body3Bold,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading2: {
    ...typography.heading2,
  },
}));

export default useStyles;
