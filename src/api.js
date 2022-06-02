const fetchFromApi = async ({
  includeCredentials = false,
  method = "GET",
  path,
  payload,
  signal,
}) => {
  const response = await fetch(`${process.env.REACT_APP_API_ORIGIN}${path}`, {
    credentials: includeCredentials ? "include" : "omit",
    method,
    signal,
    headers: payload && { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const { data, error } = await response.json();
  if (error) {
    throw error;
  }
  return data;
};

export const fetchAuthSession = ({ signal }) =>
  fetchFromApi({
    includeCredentials: true,
    path: "/auth/session/",
    signal,
  });

export const fetchSkills = ({ signal }) =>
  fetchFromApi({ path: "/skills/", signal });

export const fetchSkill = ({ queryKey: [_, skillId], signal }) =>
  fetchFromApi({ path: `/skills/${skillId}/`, signal });

export const fetchFacets = ({ signal }) =>
  fetchFromApi({ path: "/facets/", signal });

export const fetchStatements = ({ signal }) =>
  fetchFromApi({ path: "/statements/", signal });

export const fetchSkillsByFacetStatements = ({ signal }) =>
  fetchFromApi({
    includeCredentials: true,
    path: "/reflections/latest/skills-by-facet-statements/",
    signal,
  });

export const fetchLatestReflectionForSkillFacet = ({
  queryKey: [_, skillId, facetId],
  signal,
}) =>
  fetchFromApi({
    includeCredentials: true,
    path: `/reflections/latest/skills/${skillId}/facets/${facetId}/`,
    signal,
  });

export const createSkill = (skill) =>
  fetchFromApi({
    includeCredentials: true,
    method: "POST",
    path: `/skills/`,
    payload: skill,
  });

export const updateSkill = (skill) =>
  fetchFromApi({
    includeCredentials: true,
    method: "PUT",
    path: `/skills/${skill.id}/`,
    payload: skill,
  });
