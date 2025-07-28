import { configureStore } from "@reduxjs/toolkit";
// Import individual reducers for different parts of the state
import authReducer from "../features/login/authSlice"; // Handles authentication state
import { appointmentsAPI } from "../features/appointmentAPI";
import { usersAPI } from "../features/userAPI";
import { paymentAPI } from "../features/paymentAPI";
import { complaintsAPI } from "../features/complaintAPI";
import { prescriptionAPI } from "../features/prescriptionAPI";
import { transactionsAPI } from "../features/transactionAPI";

// Create and export the Redux store
export const store = configureStore({
    // Define all slices (reducers) that make up the global Redux state
    reducer: {
        auth: authReducer, // auth slice handles login, register, user info, etc.
        [appointmentsAPI.reducerPath]: appointmentsAPI.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [paymentAPI.reducerPath]: paymentAPI.reducer,
        [complaintsAPI.reducerPath]: complaintsAPI.reducer,
        [prescriptionAPI.reducerPath]:prescriptionAPI.reducer,
        [transactionsAPI.reducerPath]:transactionsAPI.reducer
    },
    // Extend default middleware to include RTK Query's middleware for caching, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(appointmentsAPI.middleware)
      .concat(usersAPI.middleware)
      .concat(paymentAPI.middleware)
      .concat(complaintsAPI.middleware)
      .concat(prescriptionAPI.middleware)
      .concat(transactionsAPI.middleware),
});

// Define types for the entire Redux state and the dispatch function
export type RootState = ReturnType<typeof store.getState>; // Type for the entire state
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function
