import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
//CSS Input
import "./components/Styles/Index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Router from "./components/Router";

import { AppProvider } from "./components/Context";
import SnackbarProvider from "react-simple-snackbar";
// import "./App.css";
// import "./components/Styles/App.scss";

// ReactDOM.render(
//   <React.StrictMode>
//     <AppProvider>
//       <Router />
//     </AppProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <SnackbarProvider>
        <AppProvider>
          <Router />
        </AppProvider>
      </SnackbarProvider>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
