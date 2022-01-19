import axios from "axios";
import { IBirdPreview } from "@shared/types";

interface IGetBirdResponse {
  birds: IBirdPreview[];
}

export async function getBirds(): Promise<IBirdPreview[]> {
  const resp = await axios.get<IGetBirdResponse>("/api/birds");
  return resp.data.birds;
}
