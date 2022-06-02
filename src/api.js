const apiUrl = (path) => `${process.env.REACT_APP_API_ORIGIN}${path}`;

const fetchApiData = ({ path, includeCredentials = false, signal }) =>
  fetch(apiUrl(path), {
    credentials: includeCredentials ? "include" : "omit",
    signal,
  })
    .then((res) => res.json())
    .then(({ data, error }) => (error ? Promise.reject(error) : data));

export const fetchSkills = async ({ signal }) =>
  fetchApiData({ path: "/skills/", signal });
