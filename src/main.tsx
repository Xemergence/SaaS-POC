import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/dashboard/ErrorBoundary";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

// Preload critical assets
const preloadAssets = () => {
  // Preload logo
  const logoLink = document.createElement("link");
  logoLink.rel = "preload";
  logoLink.href = "/vite.svg";
  logoLink.as = "image";
  document.head.appendChild(logoLink);
};

// Execute preloading
preloadAssets();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
