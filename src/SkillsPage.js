import Page from "./Page";
import useApiData from "./useApiData";
import { Card, Container, Grid, Typography } from "@mui/material";

const SkillsPage = () => {
  const { data: skills } = useApiData({ path: "/skills/" });
  return (
    <Page>
      <Container sx={{ py: 6 }}>
        <Typography component="h1" variant="h3" mb>
          Skills
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: "30em" }}>
          This page lists all of the essential skills that have been documented
          in TESSA.
        </Typography>
        {skills && (
          <Grid container spacing={2} sx={{ my: 3 }}>
            {skills.map((skill) => (
              <Grid item key={skill.id} xs={12} md={6} lg={4}>
                <Card
                  variant="outlined"
                  sx={{ background: "rgba(0,0,0,0.5)", p: 3 }}
                >
                  <Typography component="h2" variant="h6" lineHeight={1.25} mb>
                    {skill.name}
                  </Typography>
                  <Typography variant="body2">{skill.description}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default SkillsPage;
