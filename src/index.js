import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import HomePage from "./HomePage";
import NewSkillPage from "./NewSkillPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import ReflectionsPage from "./ReflectionsPage";
import reportWebVitals from "./reportWebVitals";
import { SessionProvider } from "./SessionContext";
import SkillPage from "./SkillPage";
import SkillsPage from "./SkillsPage";
import TermsOfUsePage from "./TermsOfUsePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills/" element={<SkillsPage />} />
            <Route path="/skills/:id/" element={<SkillPage />} />
            <Route path="/new-skill/" element={<NewSkillPage />} />
            <Route path="/reflections/" element={<ReflectionsPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use/" element={<TermsOfUsePage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </SessionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
