import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {},
  image: {width: '100%', height: '100%'},
  imageDefault: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  avatarTextContainer: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 8,
  },
}));

export default useStyles;
