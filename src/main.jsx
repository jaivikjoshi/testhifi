import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import UnfinishedHiFiPrototype from "../unfinished_hifi_prototype.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UnfinishedHiFiPrototype />
  </StrictMode>
);
