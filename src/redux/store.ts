import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { mainReducer } from "./reducer";

export default configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
