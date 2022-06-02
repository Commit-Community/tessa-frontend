import { useQuery } from "react-query";

import { fetchAuthSession } from "./api";

const useSession = () => {
  const { data: session, ...queryResult } = useQuery(
    ["auth", "session"],
    fetchAuthSession
  );
  const hasRole = (role) => !!session && session.roles.includes(role);
  return {
    hasRole,
    isAnonymous: hasRole("anonymous"),
    isAuthor: hasRole("author"),
    isUser: hasRole("user"),
    isAuthenticated: !!session && !!session.user_id,
    session,
    ...queryResult,
  };
};

export default useSession;
