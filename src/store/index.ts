import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./leads/leadsSlice";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "leads",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  leadsReducer
);

export const store = configureStore({
  reducer: {
    leads: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
