import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

// Ensure the root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Initialize the app with the same configuration as the main entry point
const root = createRoot(rootElement);

// Render the app
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
    <BrowserRouter>
      <Toaster />
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

// Ensure the content is rendered before react-snap captures the page
if (process.env.NODE_ENV === "production") {
  // Wait for the content to be rendered
  const waitForContent = () => {
    const rootDiv = document.querySelector("#root > div");
    if (rootDiv && rootDiv.children.length > 0) {
      return true;
    }
    return false;
  };

  // Check periodically until content is rendered
  const checkContent = () => {
    if (waitForContent()) {
      return;
    }
    setTimeout(checkContent, 100);
  };

  checkContent();
}
