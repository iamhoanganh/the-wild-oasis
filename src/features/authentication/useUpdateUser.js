import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from 'src/services/apiAuth.js'

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    // mutationFn: (newCabin) => createCabin(newCabin), // same as below
    mutationFn:  updateCurrentUser,
    onSuccess: ({user}) => {
      toast.success("User account successfully updated");
      queryClient.setQueriesData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isUpdating };
}
