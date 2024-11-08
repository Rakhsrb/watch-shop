import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import ClientSlicer from "./toolkit/ClientSlicer.jsx";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    client: ClientSlicer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
