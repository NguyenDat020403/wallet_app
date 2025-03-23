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
    marginBottom: 16,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading1: {
    ...typography.heading1,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 32,
    height: 32,
  },
  backgroundIcon: {
    backgroundColor: '#804FB0',
    borderRadius: 150,
    padding: 8,
  },
  iconHeader: {
    width: 28,
    height: 28,
  },
}));

export default useStyles;
