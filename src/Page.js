import { useContext } from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  GlobalStyles,
  Link as MuiLink,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import logo from "./logo.svg";
import SessionContext from "./SessionContext";

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
  })
);

const Page = ({ children }) => {
  const { error, isLoading, session } = useContext(SessionContext);
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles
        styles={`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        body {
          background: linear-gradient(90deg, #0f1011 0%, #010242 100%);
        }
      `}
      />
      <CssBaseline enableColorScheme />
      <Container>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          my={2}
          spacing={4}
          flexWrap="wrap"
        >
          <Stack direction="row" alignItems="center" spacing={4}>
            <Link
              to="/"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: 4,
                textDecoration: "none",
              }}
            >
              <span style={{ color: "#ff68ba" }}>T</span>
              <span style={{ color: "#fd74b4" }}>E</span>
              <span style={{ color: "#fa82ac" }}>S</span>
              <span style={{ color: "#f88ca5" }}>S</span>
              <img
                src={logo}
                alt="A"
                width={32}
                height={32}
                style={{ position: "relative", left: "-5px" }}
              />
            </Link>
            <Typography variant="button">
              <MuiLink component={Link} to="/skills/" underline="none">
                Skills
              </MuiLink>
            </Typography>
          </Stack>
          {isLoading || error || !session ? null : session.user_id ? (
            <Stack alignItems="center" direction="row">
              <Typography variant="button" mr={3}>
                Hi, {session.github_username}
              </Typography>
              <Button
                component="a"
                href={`${process.env.REACT_APP_API_ORIGIN}/auth/logout`}
                variant="text"
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
          )}
        </Stack>
      </Container>
      {children}
      <Stack mt={12} mb={6} spacing={1} direction="row" justifyContent="center">
        <Typography align="center" color="text.secondary" variant="body2">
          © Commit Solutions Inc.
        </Typography>
        <MuiLink component={Link} to="/privacy-policy/" variant="body2">
          Privacy Policy
        </MuiLink>
        <MuiLink component={Link} to="/terms-of-use/" variant="body2">
          Terms of Use
        </MuiLink>
      </Stack>
    </ThemeProvider>
  );
};

export default Page;
