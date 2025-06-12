import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingBottom: 60 - 16,
    marginVertical: 16,
  },
  createPost: {
    borderRadius: 8,
    backgroundColor: '#efefef',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody2Regular: {
    ...typography.body2Regular,
    opacity: 0.6,
  },
  textBody2Medium: {
    ...typography.body2Medium,
  },
  textBody2SemiBold: {
    ...typography.body2SemiBold,
  },
  textCap1: {
    ...typography.caption1,
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textHeading1: {
    ...typography.heading1,
  },
  divider: {
    height: 0.5,
    width: insets.screenWidth,
    backgroundColor: '#b3b3b3',
  },
  bottomPost: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 12,
    paddingTop: 4,
    alignSelf: 'center',
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    elevation: 5,
    backgroundColor: '#FFF',
    borderRadius: 16,
    height: 60,
    width: 60,
    overflow: 'hidden',
  },
  iconImage: {
    width: 60,
    height: 60,
  },
  userSection: {
    justifyContent: 'flex-end',
    width: (insets.screenWidth - 32) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  fab: {
    position: 'absolute',
    bottom: insets.bottom + 60 + 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    zIndex: 10000,
    // backgroundColor: '#007AFF',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  noTokenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingTop: 16,
  },
}));

export default useStyles;
