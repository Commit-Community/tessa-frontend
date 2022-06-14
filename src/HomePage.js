import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Page from "./Page";
import { Link } from "react-router-dom";
import useSession from "./useSession";
import SignInButton from "./SignInButton";

const HomePage = () => {
  const { isUser, isAnonymous } = useSession();
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
              <MuiLink href="https://commit.dev/">Commit</MuiLink> community.
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
    </Page>
  );
};

export default HomePage;
