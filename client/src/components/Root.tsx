import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { BirdForm } from "./BirdForm";
import { Home } from "./Home";
import { LandingPage } from "./LandingPage";
import { PageNotFound } from "./PageNotFound";

export function Root() {
  return (
    <div className="Root">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />}>
          <Route index element={<Home />} />
          <Route path="birds">
            <Route path="new" element={<BirdForm />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
