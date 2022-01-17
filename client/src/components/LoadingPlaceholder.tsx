import { Alert, LinearProgress } from "@mui/material";
import { QueryStatus } from "react-query";
import { IHaveChildren } from "src/types";

interface IProps extends IHaveChildren {
  status: QueryStatus;
}

export function LoadingPlaceholder(props: IProps) {
  const { children, status } = props;

  if (status === "loading") {
    return <LinearProgress />;
  }

  if (status === "error") {
    return <Alert severity="error">There was an error loading your birds.</Alert>;
  }

  return <>{children}</>;
}
