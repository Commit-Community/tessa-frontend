import React, { createContext } from "react";

import useApiData from "./useApiData";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const {
    data: session,
    error,
    isLoading,
  } = useApiData({ path: "/auth/session" });
  const hasRole = (role) =>
    !(isLoading || error || !session || !session.roles.includes(role));
  return (
    <SessionContext.Provider
      value={{
        error,
        hasRole,
        isAnonymous: hasRole("anonymous"),
        isAuthor: hasRole("author"),
        isUser: hasRole("user"),
        isLoading,
        session,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
