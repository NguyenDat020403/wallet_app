import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    justifyContent: 'space-between',
  },
  bottomModal: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  headerBottomModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemBottomModal: {
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#323232',
    borderRadius: 4,
  },
  textBody3Regular: {
    ...typography.body3Regular,
  },
  textBody1Medium: {
    ...typography.body1Medium,
  },
  textCap1: {
    ...typography.caption1,
    textAlign: 'center',
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#323232',
    width: 30,
    height: 30,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconClose: {
    width: 10,
    height: 10,
  },
}));

export default useStyles;
