import axios from "axios";
import { ITarget } from "@shared/types";

interface IUpdateTargetData {
  birdId: string;
  target: ITarget;
}

interface IUpdateTargetResponse {
  target: ITarget;
}

export async function updateTarget(data: IUpdateTargetData): Promise<ITarget> {
  const { birdId, target } = data;
  const resp = await axios.post<IUpdateTargetResponse>(`/api/birds/${birdId}/target`, { target });
  return resp.data.target;
}
