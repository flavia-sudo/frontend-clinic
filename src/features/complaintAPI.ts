import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";

export type TComplaint = {
    complaintId: number;
    userId: number;
    appointmentId: number;
    subject: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export const complaintsAPI = createApi({
    reducerPath: "complaintAPI",
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
    tagTypes: ["complaint"],
    endpoints: (builder) => ({
        createComplaint: builder.mutation<TComplaint, Partial<TComplaint>>({
            query: (newComplaint) => ({
                url: "/complaint",
                method: "POST",
                body: newComplaint,
            }),
            invalidatesTags: ["complaint"],
        }),
        getComplaints: builder.query<TComplaint[], void>({
            query: () => `/complaint_all`,
            providesTags: ["complaint"],
        }),
        getUserComplaints: builder.query<TComplaint[], number>({
            query: (userId) => `/complaint/user/${userId}`,
            providesTags: ["complaint"],
        }),
        updateComplaint: builder.mutation<TComplaint, Partial<TComplaint> & { complaintId: number }>({
            query: (updatedComplaint) => ({
                url: `/complaint/${updatedComplaint.complaintId}`,
                method: "PUT",
                body: updatedComplaint,
            }),
            invalidatesTags: ["complaint"],
        }),
        deleteComplaint: builder.mutation<{ success: boolean, complaintId: number }, number>({
            query: (complaintId) => ({
                url: `/complaint/${complaintId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["complaint"],
        }),
    }),
});