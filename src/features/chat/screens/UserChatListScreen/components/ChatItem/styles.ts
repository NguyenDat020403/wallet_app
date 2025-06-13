import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
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
  container: {
    width: insets.screenWidth - 32,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 12,
  },
  avatar: {width: 56, height: 56, borderRadius: 150},
  body: {
    justifyContent: 'center',
    width: insets.screenWidth - 32 - 32 - 56 - 12,
    flexWrap: 'wrap',
  },
}));

export default useStyles;
