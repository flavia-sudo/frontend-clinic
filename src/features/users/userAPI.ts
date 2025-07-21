import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/APIDomain";
import type { RootState } from "../../app/store";

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

export const usersAPI = createApi();