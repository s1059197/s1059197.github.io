import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TripDashboard from "./TripDashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TripDashboard />
  </StrictMode>
);
