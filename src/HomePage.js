import {
  Box,
  Button,
  Container,
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
            <Box mb={8} textAlign="center">
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
    </Page>
  );
};

export default HomePage;
