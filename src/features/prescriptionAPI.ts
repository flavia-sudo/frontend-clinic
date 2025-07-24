import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";

export type TPrescription = {
    prescriptionId: number;
    appointmentId: number;
    doctorId: number;
    patientId: number;
    notes: string;
    createdAt: string;
    updatedAt: string;
}
export const prescriptionAPI = createApi({
    reducerPath: "prescriptionAPI",
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
    tagTypes: ["Prescription"],
    endpoints: (builder) => ({
        createPrescription: builder.mutation<TPrescription, Partial<TPrescription>>({
            query: (newPrescription) => ({
                url: "/prescription",
                method: "POST",
                body: newPrescription
            }),
            invalidatesTags: ["Prescription"],
        }),
        getPrescriptions: builder.query<TPrescription[], void>({
            query: () => "/prescription_all",
            providesTags: ["Prescription"],
        }),
        getUserPrescription: builder.query<TPrescription[], number>({
            query: (userId) => `/prescription/user/${userId}`,
            providesTags: ["Prescription"],
        }),
        updatePrescription: builder.mutation<TPrescription, Partial<TPrescription> & { prescriptionId: number }>({
            query: (updatedPrescription) => ({
                url: `/prescription/${updatedPrescription.prescriptionId}`,
                method: "PUT",
                body: updatedPrescription
            }),
            invalidatesTags: ["Prescription"],
        }),
        deletePrescription: builder.mutation<{ success: boolean, prescriptionId: number }, number>({
            query: (prescriptionId) => ({
                url: `/prescription/${prescriptionId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Prescription"],
        })
    }),
});