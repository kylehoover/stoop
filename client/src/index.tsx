import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { Root } from "./components";
import reportWebVitals from "./reportWebVitals";

dayjs.extend(calendar);
dayjs.extend(localizedFormat);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      retry: false,
      staleTime: Infinity, // TODO: pick something more reasonable
    },
  },
});

const theme = responsiveFontSizes(createTheme());

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <Root />
          </ThemeProvider>
        </CssBaseline>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
