import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";

import Nav from "./Nav";
import Footer from "./Footer";

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          outlined: {
            background: "rgba(0,0,0,0.5)",
            borderColor: "rgba(255,255,255,0.25)",
          },
        },
      },
    },
  })
);

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  body {
    background: linear-gradient(90deg, #0f1011 0%, #010242 100%);
  }
  p, ul, ol {
    margin: 0.5em 0;
  }
`;

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles styles={globalStyles} />
      <CssBaseline enableColorScheme />
      <Nav />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Page;
