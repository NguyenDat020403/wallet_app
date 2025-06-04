import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody3Medium: {
    ...typography.body3Medium,
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
  },
  boxSecret: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#000',
    gap: 24,
    padding: 16,
  },
  hideBoxSecret: {
    gap: 4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
  },
}));

export default useStyles;
