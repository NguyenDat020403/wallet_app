import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  textTitle: {
    fontFamily: 'inter_bold',
    fontSize: 52,
    color: '#000000',
  },
  textDesc: {
    fontFamily: 'nunito_light',
    fontSize: 20,
    color: '#000000',
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 60,
    paddingHorizontal: 24,
    marginHorizontal: 16,
  },
}));

export default useStyles;
