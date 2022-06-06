import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";

// import persistCombineReducers from "redux-persist/es/persistCombineReducers";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
    // ui: uiSlice,
    // package: packageSlice,
    // admin: adminSlice,
    // ownerInvoice: ispOwnerInvoiceSlice,
    // expenditure: expenditureSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
export const persistor = persistStore(store);
