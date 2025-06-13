import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import { LifePlayground } from "./App/modules/playground/component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme accentColor="cyan" appearance="dark">
      <LifePlayground />
    </Theme>
  </StrictMode>,
);
