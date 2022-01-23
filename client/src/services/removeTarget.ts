import axios from "axios";
import { ITarget } from "@shared/types";

export async function removeTarget(birdId: string): Promise<void> {
  axios.delete(`/api/birds/${birdId}/target`);
}
