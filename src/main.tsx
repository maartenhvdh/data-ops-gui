import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@kontent-ai/stylekit";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
