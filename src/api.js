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

export const fetchSkill = ({ queryKey: [_, skillId], signal }) =>
  fetchApiData({ path: `/skills/${skillId}/`, signal });

export const fetchFacets = ({ signal }) =>
  fetchApiData({ path: "/facets/", signal });

export const fetchStatements = ({ signal }) =>
  fetchApiData({ path: "/statements/", signal });

export const fetchSkillsByFacetStatements = ({ signal }) =>
  fetchApiData({
    includeCredentials: true,
    path: "/reflections/latest/skills-by-facet-statements/",
    signal,
  });

export const fetchLatestReflectionForSkillFacet = ({
  queryKey: [_, skillId, facetId],
  signal,
}) =>
  fetchApiData({
    includeCredentials: true,
    path: `/reflections/latest/skills/${skillId}/facets/${facetId}/`,
    signal,
  });
