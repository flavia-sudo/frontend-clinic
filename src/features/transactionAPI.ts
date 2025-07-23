import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";

export type TTransaction = {
    transactionId: number;
    userId: number;
    transactionName: string;
    amount: number;
    status: boolean;
}
export const transactionsAPI = createApi({
    reducerPath: "transactionsAPI",
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
    tagTypes: ["Transaction"],
    endpoints: (builder) => ({
        createTransaction: builder.mutation<TTransaction, Partial<TTransaction>>({
            query: (newTransaction) => ({
                url: "/transaction",
                method: "POST",
                body: newTransaction,
            }),
            invalidatesTags: ["Transaction"],
        }),
        getTransactions: builder.query<TTransaction[], void>({
            query: () => "/transaction_all",
            providesTags: ["Transaction"],
        }),
        updateTransaction: builder.mutation<TTransaction, Partial<TTransaction> & { transactionId: number }>({
            query: (updatedTransaction) => ({
                url: `/transaction/${updatedTransaction.transactionId}`,
                method: "PUT",
                body: updatedTransaction,
            }),
            invalidatesTags: ["Transaction"],
        }),
        deleteTransaction: builder.mutation<{ success: boolean, transactionId: number }, number>({
            query: (transactionId) => ({
                url: `/transaction/${transactionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Transaction"],
        }),
    }),
});