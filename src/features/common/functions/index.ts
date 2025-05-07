import {store} from '@/redux';
import {setIsAppLoading} from '../redux/slices';

export const showAppLoading = () => {
  store.dispatch(setIsAppLoading(true));
};

export const hideAppLoading = () => {
  store.dispatch(setIsAppLoading(false));
};
