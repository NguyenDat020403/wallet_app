import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';
import rootSaga from './sagas';
import rootReducer from './reducers';
import {RTKQueryIdentityApi, RTKQueryWalletApi} from './RTKQuery';

const createDebugger = require('redux-flipper').default;
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .concat(RTKQueryIdentityApi.middleware)
      .concat(RTKQueryWalletApi.middleware)
      .concat(createDebugger()),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
