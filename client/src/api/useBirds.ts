import { useQuery } from "react-query";
import { getBirds } from "src/services";

export function useBirds() {
  return useQuery("birds", getBirds);
}
