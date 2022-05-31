import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";

import Page from "./Page";
import useApiData from "./useApiData";
import SessionContext from "./SessionContext";

const SkillsPage = () => {
  const { isAuthor } = useContext(SessionContext);
  const { data: skills, error, isLoading } = useApiData({ path: "/skills/" });
  return (
    <Page>
      <Container sx={{ py: 6 }}>
        {isLoading && "Loading..."}
        {error && "There was an error loading the page."}
        {skills && (
          <>
            <Typography component="h1" variant="h3" mb>
              Skills
            </Typography>
            <Typography component="p" variant="body1" sx={{ maxWidth: "30em" }}>
              This page lists all of the essential skills that have been
              documented in TESSA.
            </Typography>
            {skills && (
              <Grid container spacing={2} sx={{ my: 3 }}>
                {skills.map((skill) => (
                  <Grid item key={skill.id} xs={12} md={6} lg={4}>
                    <Card
                      variant="outlined"
                      sx={{ background: "rgba(0,0,0,0.5)", p: 3 }}
                    >
                      <Typography
                        component="h2"
                        variant="h6"
                        lineHeight={1.25}
                        mb
                        minHeight="2.5em"
                      >
                        <MuiLink
                          component={Link}
                          to={`/skills/${skill.id}/`}
                          underline="none"
                          color="inherit"
                        >
                          {skill.name}
                        </MuiLink>
                      </Typography>
                      <Typography
                        variant="body2"
                        mb={3}
                        lineHeight={1.5}
                        minHeight="4.5em"
                      >
                        {skill.description}
                      </Typography>
                      <Typography variant="button">
                        <MuiLink
                          component={Link}
                          to={`/skills/${skill.id}/`}
                          underline="none"
                        >
                          View skill
                        </MuiLink>
                      </Typography>
                    </Card>
                  </Grid>
                ))}
                {isAuthor && (
                  <Grid item xs={12} md={6} lg={4}>
                    <Box display="flex" justifyContent="center">
                      <Button
                        component={Link}
                        to="/new-skill/"
                        variant="contained"
                        sx={{ my: 10 }}
                      >
                        + Add New Skill
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Page>
  );
};

export default SkillsPage;
