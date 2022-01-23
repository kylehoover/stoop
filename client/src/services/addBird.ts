import axios from "axios";
import { IBird } from "@shared/types";

interface IAddBirdData {
  imgFile?: File;
  name: string;
  species?: string;
}

interface IAddBirdResponse {
  bird: IBird;
}

export async function addBird(data: IAddBirdData): Promise<IBird> {
  const { imgFile, name, species } = data;
  const formData = new FormData();
  formData.append("name", name);

  if (species) {
    formData.append("species", species);
  }

  if (imgFile) {
    formData.append("imgFile", imgFile);
  }

  const resp = await axios.post<IAddBirdResponse>("/api/birds", formData);

  return resp.data.bird;
}
