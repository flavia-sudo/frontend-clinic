import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";
import type { RootState } from "../app/store";

export type TUser = {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    address: string;
    role: "admin" | "user" | "doctor";
    createdAt: string;
    updatedAt: string;
    image_URL: string;
    verificationCode: string | null;
    verified: boolean
}

export type TverifyUser = {
    email: string,
    code: string
}

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        createUsers: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users']
        }),
        verifyUser: builder.mutation<TUser, TverifyUser>({
            query: (data) => ({
                url: '/auth/verify',
                method: 'POST',
                body: data
            }),
        }),

        getUsers: builder.query<{data: TUser[]}, void>({
            query: () => '/user_all',
            providesTags: ['Users']
        }),

        updateUser: builder.mutation<TUser, Partial<TUser> & { userId: number }>({
            query: (updatedUser) => ({
                url: `/user/${updatedUser.userId}`,
                method: 'PUT',
                body: updatedUser
            }),
            invalidatesTags: ['Users']
        }),

        getUserById: builder.query<TUser, number>({
            query: (userId) => `/user/${userId}`,
        }),
    })
})