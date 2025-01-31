import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    borderWidth: 4,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    shadowOffset: {width: 10, height: 4},
    shadowRadius: 14,
    elevation: 5,
  },
  images: {
    borderRadius: 9,
  },
  textNumbsOfLove: {
    marginTop: 4,
    color: '#000000',
    ...typography.body1Bold,
  },
  textType: {
    marginTop: 4,
    ...typography.caption2Medium,
    color: '#202020',
  },
}));

export default useStyles;
