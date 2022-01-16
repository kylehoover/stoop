import axios from "axios";
import { IBirdPreview } from "@shared/types";

export async function getBirds(): Promise<IBirdPreview[]> {
  const resp = await axios.get("/api/birds");
  return resp.data.birds;
}
