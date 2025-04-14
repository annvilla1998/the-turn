import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import reservationReducer from "./reservation";
import userReducer from "./user";

const reducers = combineReducers({
  reservation: reservationReducer,
  user: userReducer,
});

const persistConfig = {
  version: 1,
  key: "root",
  storage,
  whitelist: ["user"],
  timeout: 1000,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Configure the middleware properly
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, logger),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
