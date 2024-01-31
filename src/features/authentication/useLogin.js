import { useMutation } from '@tanstack/react-query'
import { login as loginApi } from 'src/services/apiAuth.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export function useLogin () {
  const navigate = useNavigate()
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log("user", user)
      navigate('/dashboard')
    },
    onError: (error) => {
      console.log("error", error)
      toast.error("Provided email or password is incorrect")
    }
  })
  return { login, isLoading }
}