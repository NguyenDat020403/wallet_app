import {Platform} from 'react-native';

const fonts = {
  Inter: Platform.select({
    android: 'Inter',
    ios: 'Inter',
    default: '',
  }),
};

export {fonts};
