import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  button: {
    backgroundColor: '#004CFF',
    borderRadius: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  textButton: {
    fontFamily: 'nunito_light',
    fontSize: 22,
    lineHeight: 31,
    alignSelf: 'center',
    color: '#F3F3F3',
  },
}));

export default useStyles;
