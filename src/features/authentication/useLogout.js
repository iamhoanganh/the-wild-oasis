import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logoutApi } from 'src/services/apiAuth.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true })
    },
    onError: () => {
      toast.error("Failed to log out")
    }
  })
  return { logout, isLoading }
}