import axios from "axios";
import { IBird } from "@shared/types";

export async function getBird(birdId: string): Promise<IBird | null> {
  const resp = await axios.get(`/api/birds/${birdId}`);
  return resp.data.bird;
}
