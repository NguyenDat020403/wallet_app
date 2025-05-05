import SimpleToast from 'react-native-simple-toast';

export const showToastMessage = (message?: string) => {
  if (!message || message === '') {
    return;
  }
  SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast.BOTTOM);
};
