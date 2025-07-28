import React, { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'sonner'
import { usersAPI, type TUser } from '../../../features/userAPI'
type UpdateDoctorProps = {
  doctor: TUser | null
}
type UpdateDoctorInputs = {
  firstName: string
  lastName: string
  specialization: string
  contactPhone: string
  availableDays: string
}
const schema = yup.object({
  firstName: yup.string().max(50).required('First name is required'),
  lastName: yup.string().max(50).required('Last name is required'),
  specialization: yup.string().max(50).required('Specialization is required'),
  contactPhone: yup.string().max(50).required('Contact phone is required'),
  availableDays: yup.string().max(50).required('Available days is required'),
})
const UpdateDoctors = ({ doctor }: UpdateDoctorProps) => {
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateDoctorInputs>({
    resolver: yupResolver(schema),
  })
  useEffect(() => {
    if (doctor) {
      setValue('firstName', doctor.firstName)
      setValue('lastName', doctor.lastName)
      setValue('specialization', doctor.specialization || '')
      setValue('contactPhone', doctor.phoneNumber || '')
      setValue('availableDays', doctor.availableDays || '')
    } else {
      reset()
    }
  }, [doctor, setValue, reset])
  const onSubmit: SubmitHandler<UpdateDoctorInputs> = async (data) => {
    if (!doctor) {
      toast.error('No doctor selected for update.')
      return
    }
    try {
      await updateUser({
        userId: doctor.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        specialization: data.specialization,
        phoneNumber: data.contactPhone,
        availableDays: data.availableDays,
      }).unwrap()
      toast.success('Doctor updated successfully!')
      reset()
      ;(document.getElementById('update_modal') as HTMLDialogElement)?.close()
    } catch (error) {
      console.error('Error updating doctor:', error)
      toast.error('Failed to update doctor. Please try again.')
    }
  }
  const handleClose = () => {
    ;(document.getElementById('update_modal') as HTMLDialogElement)?.close()
  }
  return (
    <dialog id="update_modal" className="fixed inset-0 z-50 bg-transparent">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50">
        <h3 className="font-bold text-xl mb-4 text-gray-800">Update Doctor</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register('firstName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register('lastName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <input
              type="text"
              {...register('specialization')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.specialization && (
              <span className="text-red-500 text-xs mt-1">
                {errors.specialization.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              {...register('contactPhone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.contactPhone && (
              <span className="text-red-500 text-xs mt-1">
                {errors.contactPhone.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Days
            </label>
            <input
              type="text"
              {...register('availableDays')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.availableDays && (
              <span className="text-red-500 text-xs mt-1">
                {errors.availableDays.message}
              </span>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Doctor'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
export default UpdateDoctors
