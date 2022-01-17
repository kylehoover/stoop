import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Root } from "./components";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      retry: false,
      staleTime: Infinity, // TODO: pick something more reasonable
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline>
        <QueryClientProvider client={queryClient}>
          <Root />
        </QueryClientProvider>
      </CssBaseline>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
