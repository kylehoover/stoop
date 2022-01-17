import { Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { useBird } from "src/api";
import { Bird } from "./Bird";
import { LoadingPlaceholder } from "./LoadingPlaceholder";

export function BirdPage() {
  const { birdId = "" } = useParams();
  const { data: bird, status } = useBird(birdId);

  return (
    <LoadingPlaceholder status={status} errorMessage="There was an error loading your bird.">
      {bird ? (
        <Bird bird={bird} />
      ) : (
        <Alert severity="error">Sorry, this bird doesn't exist.</Alert>
      )}
    </LoadingPlaceholder>
  );
}
