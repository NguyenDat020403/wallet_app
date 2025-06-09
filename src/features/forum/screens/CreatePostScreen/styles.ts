import {typography} from '@/styles';
import {AppEdgeInsets} from '@/hooks/types';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}, insets: AppEdgeInsets) => ({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
  },
  textBody1Regular: {
    ...typography.body1Regular,
  },
  textBody1Bold: {
    ...typography.body1Bold,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  divider: {
    height: 0.5,
    width: insets.screenWidth,
    backgroundColor: '#0000003',
  },
  addImage: {
    backgroundColor: '#efefef',
    borderRadius: 12,
    height: 100,
    justifyContent: 'center',
  },
  iconAddImage: {
    backgroundColor: '#FFF',
    height: 40,
    width: 40,
    padding: 8,
    borderRadius: 150,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    position: 'absolute',
    backgroundColor: '#FFF',
    top: 4,
    left: 4,
    zIndex: 1000,
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeImage: {
    padding: 8,
    borderRadius: 150,
    position: 'absolute',
    backgroundColor: '#FFF',
    top: 12,
    right: 12,
    zIndex: 1000,
  },
  buttonDone: {
    backgroundColor: '#efefef',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
}));

export default useStyles;
