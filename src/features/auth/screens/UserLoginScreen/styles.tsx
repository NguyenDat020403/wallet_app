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
