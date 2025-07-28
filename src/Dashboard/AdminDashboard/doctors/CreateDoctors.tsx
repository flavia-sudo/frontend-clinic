import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { usersAPI } from '../../../features/userAPI'
import { toast } from 'sonner'
type CreateDoctorInputs = {
  firstName: string
  lastName: string
  specialization: string
  phoneNumber: string
  availableDays: string
}
const schema = yup.object({
  firstName: yup
    .string()
    .max(50, 'Max 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .max(50, 'Max 50 characters')
    .required('Last name is required'),
  specialization: yup
    .string()
    .max(50, 'Max 50 characters')
    .required('Specialization is required'),
  phoneNumber: yup
    .string()
    .max(50, 'Max 50 characters')
    .required('Phone number is required'),
  availableDays: yup
    .string()
    .max(50, 'Max 50 characters')
    .required('Available days are required'),
})
const CreateDoctors = () => {
  const [createUser, { isLoading }] = usersAPI.useCreateUsersMutation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDoctorInputs>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<CreateDoctorInputs> = async (data) => {
    try {
      await createUser({
        ...data,
        role: 'doctor',
      }).unwrap()
      toast.success('Doctor created successfully!')
      reset()
      ;(document.getElementById('create_modal') as HTMLDialogElement)?.close()
    } catch (error) {
      toast.error('Failed to create doctor.')
    }
  }
  const handleClose = () => {
    ;(document.getElementById('create_modal') as HTMLDialogElement)?.close()
  }
  return (
    <dialog id="create_modal" className="fixed inset-0 z-50 bg-transparent">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-6 w-full max-w-md z-50">
        <h3 className="font-bold text-xl mb-4 text-gray-800">Create Doctor</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control w-full">
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
          <div className="form-control w-full">
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
          <div className="form-control w-full">
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
          <div className="form-control w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              {...register('phoneNumber')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          <div className="form-control w-full">
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
              {isLoading ? 'Creating...' : 'Create Doctor'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
export default CreateDoctors
