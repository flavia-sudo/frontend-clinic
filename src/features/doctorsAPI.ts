import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../utils/APIDomain";

export type TDoctor = {
    doctorId: number,
    userId: number,
    firstName: string,
    lastName: string,
    specialization: string,
    contactPhone: string,
    availableDays: string,
    createdAt: string,
    updatedAt: string
}
export const doctorsAPI = createApi({
    reducerPath: "doctorsAPI",
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
    tagTypes: ['Doctors'],
    endpoints: (builder) => ({
        createDoctor: builder.mutation<TDoctor, Partial<TDoctor>>({
            query: (newDoctor) => ({
                url: '/doctor',
                method: 'POST',
                body: newDoctor
            }),
            invalidatesTags: ['Doctors']
        }),
        getDoctors: builder.query<TDoctor[], void>({
            query: () => '/doctor_all',
            providesTags: ['Doctors']
        }),
        updateDoctor: builder.mutation<TDoctor, Partial<TDoctor> & { doctorId: number }>({
            query: (updatedDoctor) => ({
                url: `/doctor/${updatedDoctor.doctorId}`,
                method: 'PUT',
                body: updatedDoctor
            }),
            invalidatesTags: ['Doctors']
        }),
        deleteDoctor: builder.mutation<{success: boolean, doctorId: number }, number>({
            query: (doctorId) => ({
                url: `/doctor/${doctorId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Doctors']
        })
    }),
});