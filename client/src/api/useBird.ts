import { useQuery } from "react-query";
import { getBird } from "src/services";

export function useBird(birdId: string) {
  return useQuery(["bird", birdId], () => getBird(birdId));
}
