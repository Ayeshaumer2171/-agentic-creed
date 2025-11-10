// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/app/services/api";
import authReducer from "@/app/features/auth/authSlice";
import { accountsApi } from "@/app/services/accountsApi"; 
import { ticketsApi } from "@/app/services/ticketsApi";



export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(accountsApi.middleware)
      .concat(ticketsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
