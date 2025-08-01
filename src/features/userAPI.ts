import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";

// Updated to match your Drizzle schema
export type TUser = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  address: string;
  role: "admin" | "user" | "doctor";
  createdAt: string | null;
  updatedAt: string | null;
  image_URL: string | null;
  verificationCode: string | null;
  verified: boolean;

  // doctor-specific fields
  specialization: string | null;
  availableDays: string | null;
};

export type TverifyUser = {
  email: string;
  code: string;
};

export const usersAPI = createApi({
  reducerPath: "usersAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: ApiDomain,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("Token");
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // Register new user
    createUsers: builder.mutation<TUser, Partial<TUser>>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),

    // Verify account with email + code
    verifyUser: builder.mutation<TUser, TverifyUser>({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
    }),

    // Get all users
    getUsers: builder.query<{ data: TUser[] }, void>({
      query: () => "/user_all",
      providesTags: ["Users"],
    }),

    // Update user by ID
    updateUser: builder.mutation<TUser, Partial<TUser> & { userId: number }>({
      query: (updatedUser) => ({
        url: `/user/${updatedUser.userId}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),

    // Get user by ID
    getUserById: builder.query<TUser, number>({
      query: (userId) => `/user/${userId}`,
    }),

    //delete user
    deleteUser: builder.mutation<{ success: boolean; userId: number }, number>({
      query: (userId) => ({
        url: `/users/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Get only doctors (users with role: 'doctor')
    getDoctors: builder.query<{ data: TUser[] }, void>({
      query: () => "/users/doctors_all",
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateUsersMutation,
  useVerifyUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useGetDoctorsQuery,
} = usersAPI;
