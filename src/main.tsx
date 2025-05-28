import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { LifePlayground } from "./App/modules/playground/component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LifePlayground />
  </StrictMode>,
);
