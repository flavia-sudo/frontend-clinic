import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";

export type TPayment = {
    paymentId: number;
    appointmentId: number;
    amount: number;
    status: boolean;
    transactionId: number;
    paymentDate: string;
    createdAt: string;
    updatedAt: string;
}
export const paymentAPI = createApi({
    reducerPath: "paymentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("Token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        }
    }),
    tagTypes: ["Payment"],
    endpoints: (builder) => ({
        createPayment: builder.mutation<TPayment, Partial<TPayment>>({
            query: (newPayment) => ({
                url: "/payment",
                method: "POST",
                body: newPayment,
            }),
            invalidatesTags: ["Payment"],
        }),
        getPayments: builder.query<TPayment[], void>({
            query: () => "/payment_all",
            providesTags: ["Payment"],
        }),
        updatePayment: builder.mutation<TPayment, Partial<TPayment> & { paymentId: number }>({
            query: (updatedPayment) => ({
                url: `/payment/${updatedPayment.paymentId}`,
                method: "PUT",
                body: updatedPayment,
            }),
            invalidatesTags: ["Payment"],
        }),
        deletePayment: builder.mutation<{ success: boolean, paymentId: number }, number>({
            query: (paymentId) => ({
                url: `/payment/${paymentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Payment"],
        }),
    }),
})