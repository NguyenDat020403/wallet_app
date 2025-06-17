import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
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
  },
  boxWord: {
    backgroundColor: '#efefef',
    borderRadius: 8,
    padding: 16,
  },
  wordSelect: {
    backgroundColor: '#efefef',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: 12,
  },
}));

export default useStyles;
