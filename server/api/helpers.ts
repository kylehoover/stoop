import { Document, LeanDocument } from "mongoose";

export function transformLeanDoc(doc: LeanDocument<Document>): any {
  const { _id, __v, ...restDoc } = doc;

  return {
    id: _id,
    ...restDoc,
  };
}

export function transformDoc(doc: Document): any {
  return transformLeanDoc(doc.toObject());
}

export function transformDocs(docs: Document[]): any[] {
  return docs.map((doc) => doc.toObject()).map(transformLeanDoc);
}
