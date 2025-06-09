import {typography} from '@/styles';
import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
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
    backgroundColor: '#00000009',
    borderRadius: 8,
  },
  actionItem: {
    backgroundColor: '#000',
    width: 28,
    height: 28,
  },
  noDataFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingTop: 32,
  },
}));

export default useStyles;
