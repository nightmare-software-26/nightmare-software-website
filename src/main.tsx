import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { ThemeContextProvider } from "./components/theme-context-provider/index.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: allow at root
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeContextProvider>
			<App />
		</ThemeContextProvider>
	</StrictMode>,
);
