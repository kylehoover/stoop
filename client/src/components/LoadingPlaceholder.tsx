import { Alert, LinearProgress } from "@mui/material";
import { QueryStatus } from "react-query";
import { IHaveChildren } from "src/types";

interface IProps extends IHaveChildren {
  errorMessage?: string;
  status: QueryStatus;
}

const defaultErrorMessage = "Sorry, something went wrong.";

export function LoadingPlaceholder(props: IProps) {
  const { children, errorMessage = defaultErrorMessage, status } = props;

  if (status === "loading") {
    return <LinearProgress />;
  }

  if (status === "error") {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return <>{children}</>;
}
