import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../unfinished_hifi_prototype-2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
