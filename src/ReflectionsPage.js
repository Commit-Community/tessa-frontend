import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

import Page from "./Page";
import SessionContext from "./SessionContext";
import useApiData from "./useApiData";

const ReflectionsPage = () => {
  const { isAnonymous, isUser } = useContext(SessionContext);
  const { data: skills } = useApiData({ path: `/skills` });
  const { data: facets } = useApiData({ path: `/facets` });
  const { data: statements } = useApiData({ path: `/statements` });
  const { data: skillsByFacetStatements } = useApiData({
    path: `/reflections/latest/skills-by-facet-statements`,
  });
  return (
    <Page>
      <Container sx={{ py: 6 }}>
        <Typography component="h1" variant="h3" mb>
          Reflections
        </Typography>
        <Typography variant="body1" mb={3} sx={{ maxWidth: "30em" }}>
          When you reflect on essential skills and your career by selecting
          statements on the{" "}
          <MuiLink component={Link} to="/skills/">
            skill pages
          </MuiLink>
          , they are organized here so that you can take practical steps toward
          improvement.
        </Typography>
        {isUser && (
          <Fragment>
            {facets &&
              facets.map((facet) => (
                <Fragment key={facet.id}>
                  <Typography component="h2" variant="h4" mt={10} mb={2}>
                    {facet.name}
                  </Typography>
                  {statements &&
                    statements
                      .filter((s) => s.facet_id === facet.id)
                      .map((statement) => {
                        const facetStatement =
                          skillsByFacetStatements &&
                          skillsByFacetStatements.find(
                            (s) =>
                              s.facet_id === facet.id &&
                              s.statement_id === statement.id
                          );
                        return (
                          <Box key={statement.id} mb={4}>
                            <Typography component="h3" variant="h6">
                              "{statement.assertion}"
                            </Typography>
                            {skills &&
                            facetStatement &&
                            facetStatement.skills.length > 0 ? (
                              <ul>
                                {facetStatement.skills
                                  .map(({ id }) =>
                                    skills.find((s) => s.id === id)
                                  )
                                  .sort(({ name: nameA }, { name: nameB }) =>
                                    nameA > nameB ? 1 : nameA < nameB ? -1 : 0
                                  )
                                  .map((skill) => (
                                    <li key={skill.id}>
                                      <MuiLink
                                        component={Link}
                                        to={`/skills/${skill.id}/`}
                                      >
                                        {skill.name}
                                      </MuiLink>
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <Typography
                                component="p"
                                color="secondary"
                                ml={5}
                                my={2}
                              >
                                No skills have this statement selected.
                              </Typography>
                            )}
                          </Box>
                        );
                      })}
                </Fragment>
              ))}
          </Fragment>
        )}
        {isAnonymous && (
          <Alert severity="info" variant="filled">
            <AlertTitle>You must be signed in to use this feature</AlertTitle>
            Only users who are signed in can save reflections. Links to skills
            with saved reflections are shown here.
          </Alert>
        )}
      </Container>
    </Page>
  );
};

export default ReflectionsPage;
