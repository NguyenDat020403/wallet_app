import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textCap1: {
    ...typography.caption1,
  },
  permissionItemContainer: {
    backgroundColor: '#323232',
    borderRadius: 4,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    width: 24,
    height: 24,
  },
}));

export default useStyles;
