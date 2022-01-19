import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IBird } from "@shared/types";
import { BirdForm } from "./BirdForm";

export function NewBirdPage() {
  const navigate = useNavigate();

  const onCancel = useCallback(() => {
    navigate("/app");
  }, [navigate]);

  const onSuccess = useCallback(
    (bird: IBird) => {
      navigate(`/app/birds/${bird.id}`, { replace: true });
    },
    [navigate]
  );

  return <BirdForm onCancel={onCancel} onSuccess={onSuccess} />;
}
