// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // Odstranil jsem strictmode protoze kvuli nemu se volal useEffect dvakrat.
  // <StrictMode>
  <App />
  // </StrictMode>,
);
