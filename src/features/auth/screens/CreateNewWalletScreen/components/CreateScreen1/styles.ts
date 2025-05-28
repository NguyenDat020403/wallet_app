import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  textBody3Regular: {
    marginTop: 8,
    marginBottom: 4,
    ...typography.body3Regular,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textBody2Medium: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderColor: '#575757',
    ...typography.body2Medium,
    fontSize: 20,
  },
  textCap1: {
    ...typography.caption1,
  },
}));

export default useStyles;
