import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { LandingPage } from "./LandingPage";
import { PageNotFound } from "./PageNotFound";

export function Root() {
  return (
    <div className="Root">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
