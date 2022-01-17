import { Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Home } from "./Home";
import { LandingPage } from "./LandingPage";
import { NewBirdPage } from "./NewBirdPage";
import { PageNotFound } from "./PageNotFound";

export function Root() {
  return (
    <div className="Root">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />}>
          <Route index element={<Home />} />
          <Route path="birds">
            <Route path="new" element={<NewBirdPage />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
