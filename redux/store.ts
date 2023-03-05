// import { createStore,applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

// Configure Redux store with redux-persist and AsyncStorage
const persistConfig = {
  key: 'your-secret-key',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({reducer:persistedReducer});
export const persistor = persistStore(store);
