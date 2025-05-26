import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    gap: 12,
  },
  noTokenContainer: {
    gap: 16,
    paddingTop: 32,
  },
  textCap1: {
    ...typography.caption1,
  },
  textRegular: {
    ...typography.body1Regular,
  },
  content: {
    flex: 1,
    gap: 12,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '40%',
  },
  rightColumn: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    flexGrow: 1,
    flexDirection: 'row',
    gap: 8,
  },
  noDataView: {
    height: 40,
    width: 80,
    backgroundColor: '#333333',
    borderRadius: 8,
  },
  actionItem: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: '#FFF',
    width: 28,
    height: 28,
  },
}));

export default useStyles;
