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
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#efefef',
    borderBottomWidth: 0.5,
    paddingBottom: 16,
    width: insets.screenWidth,
  },
  action: {
    flexDirection: 'row',
    backgroundColor: '#efefef',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderRadius: 8,
    elevation: 2,
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
}));

export default useStyles;
