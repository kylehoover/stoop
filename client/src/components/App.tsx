import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}
