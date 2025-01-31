import {makeStyles} from '@rneui/themed';

const useStyles = makeStyles(({colors}) => ({
  container: {},
  avatarAndShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 150,
    elevation: 5,
    backgroundColor: 'transparent',
    borderRadius: 150,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
}));

export default useStyles;
