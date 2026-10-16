import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { Privacy } from "./components/Privacy.jsx";
import "./fonts.css";
import "./styles.css";
import "./directions.css";
import "./typography.css";
import "./refinements.css";
document.documentElement.dataset.theme = "dark";
document.documentElement.style.colorScheme = "dark";
try {
  localStorage.removeItem("strela-theme");
} catch {}
createRoot(document.getElementById("root")).render(
  window.location.pathname.replace(/\/$/, "") === "/privacy" ? (
    <Privacy />
  ) : (
    <App />
  ),
);
