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
  button: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFFFFF',
  },
  textAppName: {
    ...typography.body3Regular,
    alignSelf: 'center',
  },
  textAppInsight: {
    ...typography.body2Regular,
    textAlign: 'center',
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
