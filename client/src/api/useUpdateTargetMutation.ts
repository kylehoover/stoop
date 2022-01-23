import { useMutation, useQueryClient } from "react-query";
import { IBird } from "@shared/types";
import { updateTarget } from "src/services";

export function useUpdateTargetMutation(birdId: string) {
  const queryClient = useQueryClient();

  return useMutation(updateTarget, {
    onSuccess: (target) => {
      const bird = queryClient.getQueryData<IBird>(["bird", birdId]);

      if (bird) {
        queryClient.setQueryData(["bird", birdId], { ...bird, target });
      }
    },
  });
}
