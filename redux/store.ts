// import { createStore,applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE,  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

// Configure Redux store with redux-persist and AsyncStorage
const persistConfig = {
  key: 'your-secret-key',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({reducer:persistedReducer,middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),});
console.log('This is my state ===>',store.getState());
export const persistor = persistStore(store);
