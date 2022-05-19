import {
  Box,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import Page from "./Page";
import SessionContext from "./SessionContext";

const Home = () => {
  const { error, isLoading, session } = useContext(SessionContext);
  return (
    <Page
      header={
        isLoading || error ? null : session.userId ? (
          <Stack alignItems="center" direction="row">
            <Typography variant="button" mr={3}>
              Hi, {session.githubUsername}
            </Typography>
            <Button
              component="a"
              href={`${process.env.REACT_APP_API_ORIGIN}/auth/logout`}
              variant="outlined"
            >
              Sign out
            </Button>
          </Stack>
        ) : (
          <Box>
            <Button
              component="a"
              href={`${process.env.REACT_APP_API_ORIGIN}/auth/github/login`}
              variant="contained"
            >
              Sign in with GitHub
            </Button>
          </Box>
        )
      }
    >
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography
              component="h1"
              variant="h6"
              textAlign="center"
              mt={12}
              mb={6}
              sx={{ textTransform: "uppercase" }}
            >
              Technologist Essential Skills Self-Awareness
            </Typography>
            <Typography variant="h2" textAlign="center" my={12}>
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Home;
