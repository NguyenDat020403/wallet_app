import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {},
  textRegular: {
    ...typography.body1Regular,
  },
  textCap: {
    ...typography.caption1,
  },
  textMedium: {
    ...typography.body1Medium,
  },
  textSemiBold: {
    ...typography.body2SemiBold,
  },
  divider: {
    height: 0.5,
    width: insets.screenWidth,
    backgroundColor: '#b3b3b3',
  },

  networkRow: {
    height: 52,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  extendContainer: {
    flex: 1,
    paddingLeft: 28,
    gap: 8,
    paddingBottom: 24,
    paddingTop: 8,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#efefef',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
