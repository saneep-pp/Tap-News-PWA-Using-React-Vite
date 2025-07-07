import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
// src/main.tsx

window.addEventListener("beforeinstallprompt", (e) => {
  let deferredPrompt: any;
  e.preventDefault();
  deferredPrompt = e;
  localStorage.setItem("showInstallPrompt", "true");
});
