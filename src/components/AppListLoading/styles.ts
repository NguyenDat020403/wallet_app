import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: 'transparent'},

  loadingContainer: {
    width: '100%',
  },
  loadingIndicator: {
    color: colors.primary,
  },
  loadingText: {
    ...typography.caption1,
    paddingLeft: spacing.paddingXS1,
  },
}));

export default useStyles;
