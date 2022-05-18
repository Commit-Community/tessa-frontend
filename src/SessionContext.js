import React, { createContext } from "react";

import useApiData from "./useApiData";

const SessionContext = createContext({
  userId: undefined,
  githubUsername: undefined,
});

export const SessionProvider = ({ children }) => {
  const {
    data: session,
    error,
    isLoading,
  } = useApiData({ initialData: {}, path: "/auth/session" });
  return (
    <SessionContext.Provider
      value={{
        error,
        isLoading,
        session: {
          userId: session.user_id,
          githubUsername: session.github_username,
        },
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
