import {typography} from '@/styles';
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
  forgotText: {
    fontFamily: 'nunito_light',
    fontSize: 15,
    lineHeight: 22,
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
    color: '#000000',
  },
}));

export default useStyles;
