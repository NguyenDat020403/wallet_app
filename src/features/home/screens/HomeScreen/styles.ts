import {AppEdgeInsets} from '@/hooks/types';
import {typography} from '@/styles';
import {ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  header: {
    position: 'absolute',
    top: insets.top,
    width: insets.screenWidth,
    paddingHorizontal: 16,
    zIndex: 1000,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonHeaderRight: {
    width: 35,
    height: 35,
    backgroundColor: '#F8F8F8',
    borderRadius: 150,
    justifyContent: 'center',
    position: 'relative',
  },
  avatarAndShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 150,
    elevation: 5,
    backgroundColor: 'transparent',
    borderRadius: 150,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  textWelcome: {
    marginVertical: 16,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: '#202020',
    fontFamily: 'Raleway-Regular',
  },
  welcomeBody: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  textTitle: {
    ...typography.title1Bold,
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
  textSecondTitle: {
    marginVertical: 16,
    ...typography.title2Bold,
    color: '#202020',
  },
  myOrder: {
    marginBottom: 16,
    flexDirection: 'row',
    height: 35,
    paddingHorizontal: 16,
    gap: 8,
    justifyContent: 'flex-start',
  },
  myOrderButton: {
    position: 'relative',
    backgroundColor: '#E5EBFC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  textMyOrder: {
    color: '#0042E0',
  },
  textMoreInfo: {
    ...typography.body2Bold,
    color: '#000000',
  },
}));

export default useStyles;
