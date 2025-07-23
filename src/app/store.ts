import { configureStore } from "@reduxjs/toolkit";
// Import individual reducers for different parts of the state
import authReducer from "../features/login/authSlice"; // Handles authentication state
import { doctorsAPI } from "../features/doctorsAPI"; // Handles doctors API via RTK Query

// Create and export the Redux store
export const store = configureStore({
    // Define all slices (reducers) that make up the global Redux state
    reducer: {
        auth: authReducer, // auth slice handles login, register, user info, etc.
        [doctorsAPI.reducerPath]: doctorsAPI.reducer, // doctorsAPI slice handles fetching doctors via RTK Query
    },
    // Extend default middleware to include RTK Query's middleware for caching, polling, etc.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(doctorsAPI.middleware),
});

// Define types for the entire Redux state and the dispatch function
export type RootState = ReturnType<typeof store.getState>; // Type for the entire state
export type AppDispatch = typeof store.dispatch; // Type for the dispatch function
