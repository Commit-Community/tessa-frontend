const fetchApiData = async ({ path, includeCredentials = false, signal }) => {
  const response = await fetch(`${process.env.REACT_APP_API_ORIGIN}${path}`, {
    credentials: includeCredentials ? "include" : "omit",
    signal,
  });
  const { data, error } = await response.json();
  if (error) {
    throw error;
  }
  return data;
};

export const fetchAuthSession = ({ signal }) =>
  fetchApiData({
    includeCredentials: true,
    path: "/auth/session/",
    signal,
  });

export const fetchSkills = ({ signal }) =>
  fetchApiData({ path: "/skills/", signal });
