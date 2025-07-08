import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

window.deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e: any) => {
  e.preventDefault();
  window.deferredPrompt = e;
  localStorage.setItem("showInstallPrompt", "true");
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

