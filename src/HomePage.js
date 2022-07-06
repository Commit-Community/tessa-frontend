import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import MarkdownIt from "markdown-it";
import { useQuery } from "react-query";

import { fetchChangesFeed } from "./api";
import { Link } from "react-router-dom";
import Page from "./Page";
import SignInButton from "./SignInButton";
import useSession from "./useSession";
import SkillCard from "./SkillCard";

const md = new MarkdownIt();

const HomePage = () => {
  const { isUser, isAnonymous } = useSession();
  const { data: changesFeed, isSuccess: isSuccessChangesFeed } = useQuery(
    ["feeds", "changes"],
    fetchChangesFeed
  );
  return (
    <Page>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography
              component="h1"
              variant="h6"
              textAlign="center"
              sx={(theme) => ({
                textTransform: "uppercase",
                my: 6,
                [theme.breakpoints.up("sm")]: { mt: 12 },
              })}
            >
              Technologist Essential Skills Self-Awareness
            </Typography>
            <Typography
              variant="h2"
              textAlign="center"
              sx={(theme) => ({
                my: 6,
                [theme.breakpoints.up("sm")]: { my: 12 },
              })}
            >
              A tool for technologists to grow their careers faster.
            </Typography>
            <Typography
              color="text.secondary"
              variant="h5"
              textAlign="center"
              mb={8}
            >
              Improve self-awareness and practice essential skills with
              recommendations from the{" "}
              <MuiLink href="https://bit.ly/TESSAtoCommit">Commit</MuiLink>{" "}
              community.
            </Typography>
            <Box mb={12} textAlign="center" minHeight={100}>
              {isAnonymous && (
                <>
                  <Typography
                    component="p"
                    variant="overline"
                    mb={2}
                    textAlign="center"
                  >
                    Sign in to get started
                  </Typography>
                  <SignInButton size="large" variant="contained" />
                </>
              )}
              {isUser && (
                <Button
                  component={Link}
                  to="/guide/"
                  variant="contained"
                  size="large"
                >
                  Get Started
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box pt={6} pb={9} sx={{ backgroundColor: "rgba(200,240,255,0.06)" }}>
        <Container>
          <Grid
            container
            justifyContent="center"
            columnSpacing={12}
            rowSpacing={6}
          >
            <Grid item xs={12} md={7}>
              <Typography component="h2" variant="h2" textAlign="center" mb={3}>
                How it works
              </Typography>
              <Typography component="p" variant="h5" textAlign="center">
                You're a technologist and you want to advance your career. You
                know that being a technical leader needs both technical and
                non-technical skills.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component="h3" variant="h4" mb={6} textAlign="center">
                Essential Skills
              </Typography>
              <Typography component="p" minHeight={112}>
                <b>Essential skills</b> are practiced{" "}
                <b>strategies, mindsets, and habits</b> that improve your own
                and your colleagues productivity and effectiveness.
              </Typography>
              <Typography component="p" minHeight={112}>
                Members of the{" "}
                <MuiLink href="https://commit.dev/">Commit</MuiLink> community
                have documented a number of essential skills that they believe
                can help technologists grow their careers faster.
              </Typography>
              <Box textAlign="center" my={3}>
                <Button
                  component={Link}
                  to="/skills/"
                  fullWidth
                  size="large"
                  variant="outlined"
                >
                  Browse Essential Skills
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography component="h3" variant="h4" mb={6} textAlign="center">
                Self-Awareness
              </Typography>
              <Typography component="p" minHeight={112}>
                TESSA helps you ask yourself questions about each essential
                skill. Recommendations for how to approach each question are
                organized by the different aspects of each skill that might
                affect whether to put effort into developing it.
              </Typography>
              <Typography component="p" minHeight={112}>
                By reviewing your answers to these questions, your awareness of
                essential skills will improve and you can make specific goals
                for how to develop them.
              </Typography>
              <Box textAlign="center" my={3}>
                <Button
                  component={Link}
                  to="/reflections/"
                  fullWidth
                  size="large"
                  variant="outlined"
                >
                  Review Your Reflections
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={6}>
        <Container>
          <Typography component="h2" variant="h2" align="center">
            Latest updates
          </Typography>
          <Typography component="h3" variant="h5" align="center" pt={6} pb={3}>
            Recently updated in essential skills
          </Typography>
          {isSuccessChangesFeed && (
            <Grid container spacing={2}>
              {changesFeed.skills.map((skill) => (
                <Grid item key={skill.id} xs={12} md={6} lg={4}>
                  <SkillCard skill={skill} />
                </Grid>
              ))}
            </Grid>
          )}
          <Typography component="h3" variant="h5" align="center" pt={9} pb={6}>
            Recently contributed in community recommendations
          </Typography>
          {isSuccessChangesFeed && (
            <Grid container columnSpacing={2} rowSpacing={6}>
              {changesFeed.recommendations.map((recommendation) => (
                <Grid item key={recommendation.id} xs={12} md={6} lg={4}>
                  <Box mb={2} minHeight="4.5em">
                    On{" "}
                    <MuiLink
                      component={Link}
                      to={`/skills/${recommendation.skill.id}`}
                    >
                      {recommendation.skill.name}
                    </MuiLink>
                    , for the question{" "}
                    <b>"{recommendation.facet.recommendation_prompt}"</b>{" "}
                    someone recommended:
                  </Box>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <Typography component="div" px={1.5}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: md.render(recommendation.markdown),
                        }}
                      />
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Page>
  );
};

export default HomePage;
