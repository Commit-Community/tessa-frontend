import {
  Container,
  Divider,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, useMatch } from "react-router-dom";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "./logo.svg";
import SignInButton from "./SignInButton";
import useSession from "./useSession";

const Logo = () => (
  <Link
    to="/"
    style={{
      alignItems: "center",
      display: "inline-flex",
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
);

const DesktopNavLink = ({ path, label }) => (
  <Typography variant="button">
    <MuiLink component={Link} to={path} underline="none">
      {label}
    </MuiLink>
  </Typography>
);

const SignOutButton = () => (
  <Typography variant="button">
    <MuiLink
      component="a"
      href={`${process.env.REACT_APP_API_ORIGIN}/auth/logout/`}
      underline="none"
    >
      Sign out
    </MuiLink>
  </Typography>
);

const DesktopNav = () => {
  const { isAnonymous, isAuthenticated, session } = useSession();
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" spacing={4} py={2}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <Logo />
          <DesktopNavLink label="Skills" path="/skills/" />
          <DesktopNavLink label="Reflections" path="/reflections/" />
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          {isAuthenticated && (
            <Typography variant="button">
              Hi, {session.github_username}
            </Typography>
          )}
          {isAuthenticated && <SignOutButton />}
          {isAnonymous && <SignInButton variant="contained" />}
        </Stack>
      </Stack>
    </Container>
  );
};

const MobileNavLink = ({ label, path }) => (
  <ListItem disablePadding>
    <ListItemButton component={Link} to={path} selected={!!useMatch(path)}>
      <Typography variant="button">{label}</Typography>
    </ListItemButton>
  </ListItem>
);

const MobileNav = () => {
  const { isAnonymous, isAuthenticated, session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" spacing={4} py={1}>
        <Logo />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Stack>
      <List sx={{ display: isOpen ? "block" : "none" }}>
        <MobileNavLink label="Home" path="/" />
        <MobileNavLink label="Skills" path="/skills/" />
        <MobileNavLink label="Reflections" path="/reflections/" />
        <Divider />
        {isAuthenticated && (
          <ListItem divider>
            <ListItemText>
              <Typography variant="button" color="secondary">
                Hi, {session.github_username}
              </Typography>
            </ListItemText>
            <SignOutButton />
          </ListItem>
        )}
        {isAnonymous && (
          <ListItem divider alignItems="center">
            <SignInButton variant="contained" size="small" />
          </ListItem>
        )}
      </List>
    </Container>
  );
};

const Nav = () => {
  const isWideEnoughForDesktopNav = useMediaQuery("(min-width:768px)", {
    noSsr: true,
  });
  return isWideEnoughForDesktopNav ? <DesktopNav /> : <MobileNav />;
};

export default Nav;
