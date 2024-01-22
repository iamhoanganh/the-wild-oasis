import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from 'src/services/apiBookings.js'
import { toast } from 'react-hot-toast'

export function useCheckout () {
  const queryClient = useQueryClient()
  const { mutate: checkout, isLoading: isCheckout } = useMutation({
      mutationFn: ( bookingId ) => updateBooking(bookingId, {
        status: 'checked-out',
      }),
      onSuccess: (data) => {
        toast.success(`Booking ${data.id} successfully checked out`)
        queryClient.invalidateQueries({ active: true })

      },
      onError: () => {
        toast.error('Error checkout in the booking')
      }
    }
  )
  return { checkout, isCheckout }
}