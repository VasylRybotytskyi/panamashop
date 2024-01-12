import { configureStore } from "@reduxjs/toolkit";
import panamaSlice from "./panamaSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { sneakersApi } from "./SneakersApi"; // Import the sneakersApi object

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, panamaSlice);

export const store = configureStore({
  reducer: {
    panama: persistedReducer,
    [sneakersApi.reducerPath]: sneakersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sneakersApi.middleware),
});

export let persistor = persistStore(store);
