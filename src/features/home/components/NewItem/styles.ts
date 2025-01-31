import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(() => ({
  container: {},
  images: {
    borderRadius: 9,
    borderWidth: 5,
    borderColor: '#FFFFFF',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 150,
    elevation: 10,
  },
  textDesc: {
    marginTop: 12,
    color: '#000000',
    ...typography.body1Regular,
  },
  textPrice: {
    marginTop: 4,
    color: '#000000',
    ...typography.body1Bold,
  },
}));

export default useStyles;
