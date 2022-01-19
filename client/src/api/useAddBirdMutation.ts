import { useMutation, useQueryClient } from "react-query";
import { IBirdPreview } from "@shared/types";
import { addBird } from "src/services";

export function useAddBirdMutation() {
  const queryClient = useQueryClient();

  return useMutation(addBird, {
    onSuccess: (bird) => {
      const birds = queryClient.getQueryData<IBirdPreview[]>("birds");
      queryClient.setQueryData(["bird", bird.id], bird);

      if (birds) {
        queryClient.setQueryData("birds", [...birds, bird]);
      }
    },
  });
}
