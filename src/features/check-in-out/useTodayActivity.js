import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from 'src/services/apiBookings.js'

export function useTodayActivity() {
  const {isLoading, data: activities} = useQuery(
    {
      queryFn: getStaysTodayActivity,
      queryKey: ['todayActivity'],
    }
  )
  return {isLoading, stays: activities}
}