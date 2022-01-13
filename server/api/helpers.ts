import { Document, HydratedDocument, LeanDocument } from "mongoose";
import {
  IBird,
  IBirdBase,
  IBirdModel,
  IBirdPreview,
  IBirdPreviewModel,
  ITargetModel,
} from "../types";

export function transformLeanDoc(doc: LeanDocument<Document>): any {
  const { _id, __v, ...restDoc } = doc;

  return {
    id: _id,
    ...restDoc,
  };
}

export function transformDoc(doc: Document | null): any {
  return doc ? transformLeanDoc(doc.toObject()) : null;
}

export function transformDocs(docs: Document[]): any[] {
  return docs.map((doc) => transformLeanDoc(doc.toObject()));
}

function createStaticPath(file: string): string {
  return file ? `/static/birds/${file}` : file;
}

function transformBirdHelper(bird: HydratedDocument<IBirdPreviewModel>): IBird {
  return { ...transformLeanDoc(bird.toObject()), img: createStaticPath(bird.img) };
}

export function transformBird(bird: HydratedDocument<IBirdPreviewModel> | null): IBird | null {
  return bird ? transformBirdHelper(bird) : null;
}

export function transformBirds(birds: HydratedDocument<IBirdPreviewModel>[]): IBirdPreview[] {
  return birds.map(transformBirdHelper);
}
