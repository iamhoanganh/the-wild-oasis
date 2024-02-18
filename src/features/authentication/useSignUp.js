import { useMutation } from '@tanstack/react-query'
import { signUp as signUpApi } from 'src/services/apiAuth.js'
import { toast } from 'react-hot-toast'

export function useSignUp () {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) => signUpApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success("User created successfully! Please verify your email to login.")
    },
    onError: () => {
      toast.error("Failed to create user. Please try again.")
    }
  })
  return { signUp, isLoading }
}
