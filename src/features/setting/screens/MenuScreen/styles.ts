import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  info: {
    paddingVertical: 16,
    width: insets.screenWidth,
    paddingHorizontal: 16,
    zIndex: 1000,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: spacing.avatarSizeL,
    height: spacing.avatarSizeL,
    borderRadius: 150,
  },
  textName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#202020',
    fontFamily: 'nunito_regular',
  },
  textEmail: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'nunito_medium',
  },
  banner: {
    height: 100,
    width: insets.screenWidth - 32,
    padding: 16,
    borderRadius: 12,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backgroundCrown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 150,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBanner: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textBold: {
    ...typography.body1Bold,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textRegular: {
    ...typography.body1Regular,
    color: '#FFFFFF',
  },
}));

export default useStyles;
