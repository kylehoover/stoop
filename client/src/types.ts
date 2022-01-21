import { ReactNode } from "react";

export interface IHaveChildren {
  children: ReactNode;
}

export interface IHaveFormHandlers<TSuccessData> {
  onCancel: () => void;
  onSuccess: (data: TSuccessData) => void;
}
