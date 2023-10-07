import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import ProductReducer from "./Slice/productSlice";
import voucherSlice from "./Slice/voucherSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  product: ProductReducer,
  voucher: voucherSlice,
});
const persistedReducer = persistReducer(persistConfig,reducers)
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
