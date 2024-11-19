import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import agentReducer from './slices/agentSlice';
import orderReducer from './slices/orderSlice';
import notificationReducer from './slices/notificationSlice';
import eventReducer from './slices/EventSlice';
import logReducer from './slices/logSlice';
import analyticsReducer from './slices/analyticsSlice';
import adminReducer from './slices/adminSlice';
import popupReducer from './slices/popupslice';
import requestReducer from './slices/requestSlice';
import ticketReducer from './slices/ticketSlice';
import checkerReducer from './slices/checkerSlice';
import lineupReducer from './slices/lineupSlice';
export const store = configureStore({
  reducer: {
    userReducer,
    agentReducer,
    orderReducer,
    notificationReducer,
    eventReducer,
    logReducer,
    analyticsReducer,
    adminReducer,
    popupReducer,
    requestReducer,
    ticketReducer,
    checkerReducer,
    lineupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
