import { useQuery } from "react-query";
import { getBirds } from "src/services";

export function useBirds(): [] {
  const { data } = useQuery("birds", getBirds);
  return [];
}
