import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BirdForm } from "./BirdForm";

export function NewBirdPage() {
  const navigate = useNavigate();

  const onCancel = useCallback(() => {
    navigate("/app");
  }, [navigate]);

  return <BirdForm onCancel={onCancel} />;
}
