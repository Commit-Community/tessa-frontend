import React from "react";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  GlobalStyles,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

import logo from "./logo.svg";

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
  })
);

const Page = ({ children, header }) => (
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
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            fontWeight: 900,
            fontSize: 28,
            letterSpacing: 4,
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
        </Box>
        {header}
      </Stack>
    </Container>
    {children}
    <Box mt={12} mb={6}>
      <Typography align="center" color="text.secondary" variant="body2">
        © Commit Solutions Inc.
      </Typography>
    </Box>
  </ThemeProvider>
);

export default Page;
