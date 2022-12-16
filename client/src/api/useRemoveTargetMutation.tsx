import { useMutation, useQueryClient } from "react-query";
import { IBird } from "@shared/types";
import { removeTarget } from "src/services";

export function useRemoveTargetMutation(birdId: string) {
  const queryClient = useQueryClient();

  return useMutation(removeTarget, {
    onSuccess: () => {
      const bird = queryClient.getQueryData<IBird>(["bird", birdId]);

      if (bird) {
        queryClient.setQueryData(["bird", birdId], { ...bird, target: undefined });
      }
    },
  });
}
