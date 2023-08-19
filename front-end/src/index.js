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

import { IndexRouters } from "./router";
import { SimpleRouter } from "./router/simple-router";
import { DefaultRouter } from "./router/default-router";

const router = createBrowserRouter(
  [...DefaultRouter, ...IndexRouters, ...SimpleRouter],
  { basename: process.env.PUBLIC_URL }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router}></RouterProvider>
      </App>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
