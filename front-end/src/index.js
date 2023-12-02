import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//store
import { Provider } from "react-redux";
//reducer
import { store } from "./store";

import { SimpleRouter } from "./router/simple-router";
import { DefaultRouter } from "./router/default-router";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter(
  [...DefaultRouter, ...SimpleRouter],
  { basename: process.env.PUBLIC_URL }
);

{/*
  <React.StrictMode>
  </React.StrictMode>
*/}
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SnackbarProvider style={{ whiteSpace: "pre-line", maxWidth: "500px" }} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </SnackbarProvider>
  </Provider>
);

reportWebVitals();
