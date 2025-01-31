import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {store} from '..';
import rootReducer from '../reducers';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
