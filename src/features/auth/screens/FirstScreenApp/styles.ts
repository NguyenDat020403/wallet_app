import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    paddingTop: 32,
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1244 / 1208,
  },

  textAppName: {
    ...typography.body3Regular,
    alignSelf: 'center',
  },
  textAppInsight: {
    ...typography.body2Regular,
    alignSelf: 'center',
  },
  buttonStart: {
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
  registerContainer: {
    marginBottom: 30,
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textRegister: {
    fontFamily: 'nunito_light',
    fontSize: 15,
    lineHeight: 26,
    alignSelf: 'center',
    color: '#202020',
  },
  iconArrowRight: {
    backgroundColor: '#004CFF',
    width: 30,
    height: 30,
    borderRadius: 150,
    justifyContent: 'center',
    marginLeft: 12,
  },
}));

export default useStyles;
