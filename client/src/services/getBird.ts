import axios from "axios";
import { IBird } from "@shared/types";

interface IGetBirdResponse {
  bird: IBird;
}

export async function getBird(birdId: string): Promise<IBird | null> {
  const resp = await axios.get<IGetBirdResponse>(`/api/birds/${birdId}`);
  return resp.data.bird;
}
