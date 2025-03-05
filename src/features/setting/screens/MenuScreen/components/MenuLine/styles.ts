import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#9E9E9E',
    ...typography.body2Medium,
    marginRight: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#9E9E9E',
  },
}));

export default useStyles;
