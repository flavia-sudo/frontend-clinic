import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";

export type TAppointment = {
    appointmentId: number;
    userId: number;
    doctorId: number;
    appointmentDate: string;
    time: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const appointmentsAPI = createApi({
    reducerPath: "appointmentsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('Token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers
        }
    }),
    tagTypes: ["Appointments"],
    endpoints: (builder) => ({
        createAppointment: builder.mutation<TAppointment, Partial<TAppointment>>({
            query: (newAppointment) => ({
                url: '/appointment',
                method: 'POST',
                body: newAppointment
            }),
            invalidatesTags: ['Appointments']
        }),
        getAppointments: builder.query<TAppointment[], void>({
            query: () => '/appointment_all',
            providesTags: ['Appointments']
        }),
        getUserAppointments: builder.query<TAppointment[], number>({
            query: (userId) => `/appointment/user/${userId}`,
            providesTags: ['Appointments']
        }),
        updateAppointment: builder.mutation<TAppointment, Partial<TAppointment> & { appointmentId: number }>({
            query: (updatedAppointment) => ({
                url: `/appointment/${updatedAppointment.appointmentId}`,
                method: 'PUT',
                body: updatedAppointment
            }),
            invalidatesTags: ['Appointments']
        }),
        deleteAppointment: builder.mutation<{ success: boolean, appointmentId: number }, number>({
            query: (appointmentId) => ({
                url: `/appointment/${appointmentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Appointments']
        })
    }),
});