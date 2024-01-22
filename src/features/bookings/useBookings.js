import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from 'src/services/apiBookings.js'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from 'src/utils/constants.js'

export function useBookings () {
  const queryClient = useQueryClient()
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
  // QUERY
  const {
    isLoading,
    data: {data: bookings, count} ={},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], // dependent on the queryKey, the query will be refetched
    queryFn: () => getBookings({ filter, sortBy, page })
  })
  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1], // dependent on the queryKey, the query will be refetched
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    })
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1], // dependent on the queryKey, the query will be refetched
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    })
  }
  return { isLoading, bookings, error, count  }
}
