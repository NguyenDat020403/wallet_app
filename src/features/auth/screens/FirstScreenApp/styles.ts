import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 82,
    height: 92,
  },
  containerLogo: {
    height: 150,
    width: 150,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 150,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.25,
    shadowRadius: 150,
    elevation: 10,
  },
  textAppName: {
    paddingVertical: 16,
    alignSelf: 'center',
    fontFamily: 'inter_bold',
    fontSize: 52,
    fontWeight: '700',
    color: '#000000',
  },
  textAppInsight: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'nunito_light',
    fontSize: 20,
    lineHeight: 35,
    color: '#000000',
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
