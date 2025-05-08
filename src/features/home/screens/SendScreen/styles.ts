import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#0F0F0F'},
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Regular: {
    ...typography.body2Regular,
    opacity: 0.6,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textBody2SemiBold: {
    ...typography.body2SemiBold,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading1: {
    ...typography.heading1,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  tabBar: {
    flexDirection: 'row',
    gap: 16,
    alignSelf: 'center',
    paddingVertical: 16,
  },
}));

export default useStyles;
