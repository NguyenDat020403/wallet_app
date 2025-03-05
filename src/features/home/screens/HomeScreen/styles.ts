import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {ScreenWidth} from '@rneui/base';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  header: {
    position: 'absolute',
    top: insets.top,
    paddingVertical: 16,
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
  headerButtonRight: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#004CFF',
    borderRadius: 32,
    alignSelf: 'center',
  },
  headerTextButtonRight: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'nunito_medium',
  },
  avatar: {
    width: spacing.avatarSizeL,
    height: spacing.avatarSizeL,
    borderRadius: 150,
  },
  textHeaderMessage: {
    fontSize: 14,
    fontWeight: '400',
    color: '#202020',
    fontFamily: 'nunito_regular',
  },
  textHeaderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'nunito_bold',
  },
  body: {
    marginTop: insets.top + spacing.avatarSizeL,
    marginBottom: 60,
  },
  textLarge: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'nunito_bold',
  },
  textMedium: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: 'nunito_medium',
  },
  textRegular: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'nunito_regular',
  },
  buttonSelectPhoto: {
    backgroundColor: '#FFFFFF',
    width: 120,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  textButtonBanner: {
    fontSize: 14,
    fontWeight: '700',
    color: '#004CFF',
    fontFamily: 'nunito_medium',
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
