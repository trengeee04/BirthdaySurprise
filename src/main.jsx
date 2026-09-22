import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styles — order matters
import "./styles/index.css";
import "./styles/animations.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
