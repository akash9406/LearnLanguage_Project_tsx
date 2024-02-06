import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

export const server = "http://localhost:8080/api/user";
const theme = createTheme({
  palette: {
    primary: {
      main: "#C38D9E",
      contrastText: "#fff",
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
