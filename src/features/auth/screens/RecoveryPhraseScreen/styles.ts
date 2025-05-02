import {typography} from '@/styles';
import {ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 16,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Regular: {
    ...typography.body2Regular,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textBody2SemiBold: {
    ...typography.body2SemiBold,
  },
  textCap1: {
    ...typography.caption1,
  },
  textBody1Regular: {
    ...typography.body1Regular,
    width: (ScreenWidth - 24) / 3,
  },
  boxSecret: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#FFFFFF',
    height: 156,
    gap: 16,
    padding: 12,
  },
  blurStyle: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  headerBg: {
    flex: 1,
    backgroundColor: '#FFF',
  },
}));

export default useStyles;
