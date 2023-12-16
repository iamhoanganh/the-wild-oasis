import { useQuery } from '@tanstack/react-query'
import { getBookings } from 'src/services/apiBookings.js'
import { useSearchParams } from 'react-router-dom'

export function useBookings () {
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get('status')

  const filter = !filterValue || filterValue === 'all' ? null : {
    field: 'status', value: filterValue, method: 'eq'
  }
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = { field, direction }
  // PAGINATION
  const page = Number(searchParams.get('page')) || 1
  const {
    isLoading,
    data: {data: bookings, count} ={},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], // dependent on the queryKey, the query will be refetched
    queryFn: () => getBookings({ filter, sortBy, page })
  })
  console.log("bookings", bookings)
  return { isLoading, bookings, error, count  }
}
