import {AppEdgeInsets} from '@/hooks/types';
import {spacing, typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  textRegular: {
    ...typography.body1Regular,
  },
  textMedium: {
    ...typography.body1Medium,
  },
  textSemiBold: {
    ...typography.body2SemiBold,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  info: {
    position: 'absolute',
    zIndex: 10000,
    top: insets.top + 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#efefef',
    borderBottomWidth: 0.5,
    width: insets.screenWidth,
  },
  action: {
    flexDirection: 'row',
    backgroundColor: '#efefef',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderRadius: 8,
  },
  posts: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingBottom: 60 - 16,
    marginVertical: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: '#efefef',
    elevation: 4,
  },
  name: {
    ...typography.body3Bold,
    lineHeight: 32,
  },
  email: {
    ...typography.body1Regular,
    marginTop: 4,
    color: '#444',
  },
  bio: {
    marginBottom: 16,
    marginTop: 4,
    ...typography.caption1,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  divider: {
    height: 0.5,
    width: insets.screenWidth,
    backgroundColor: '#b3b3b3',
  },
  fab: {
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: insets.screenWidth - 32,
  },
  fab1: {
    position: 'absolute',
    bottom: insets.bottom + 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    zIndex: 10000,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
}));

export default useStyles;
