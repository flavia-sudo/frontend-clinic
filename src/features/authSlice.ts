// Importing necessary functions and types from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Defining the shape of the user object stored in the state
interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string | null;
  address: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
  image_URL: string;
  verificationCode: string | null;
  verified: boolean;
  token: string;
}

// Defining the shape of the authentication state
interface AuthState {
    user: User | null; // Will be null if not logged in
}

// Initialize the auth state by checking if a user is stored in localStorage
const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("User") || "null"), // Parse user from localStorage or null
};

// Create a Redux slice for authentication logic
const authSlice = createSlice({
    name: "auth", // Name of the slice
    initialState, // Initial state for the slice
    reducers: {
        // Action to log the user in
        login(state, action: PayloadAction<User>) {
            state.user = action.payload; // Set user state with the payload
            // Save user and token in localStorage for persistence across reloads
            localStorage.setItem("User", JSON.stringify(action.payload));
            localStorage.setItem("Token", action.payload.token);
        },
        // Action to log the user out
        logout(state) {
            state.user = null; // Clear user from state
            // Remove user and token from localStorage
            localStorage.removeItem("User");
            localStorage.removeItem("Token");
        },
    },
});

// Exporting the login and logout actions
export const { login, logout } = authSlice.actions;

// Exporting the reducer to be used in the store
export default authSlice.reducer;