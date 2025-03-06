import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "@/components/ui/sonner";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import SocketContextProvider from "./context/socketConext.jsx";

// const persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <SocketContextProvider>
        <App />
        </SocketContextProvider>
      {/* </PersistGate> */}
      <Toaster />
    </Provider>

);
