import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./HomePage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import reportWebVitals from "./reportWebVitals";
import { SessionProvider } from "./SessionContext";
import SkillsPage from "./SkillsPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills/" element={<SkillsPage />} />
          <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
