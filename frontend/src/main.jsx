import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WishlistProvider } from "./WishlistContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </StrictMode>
);
