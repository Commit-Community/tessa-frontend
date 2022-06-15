import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";

import Page from "./Page";
import { Link } from "react-router-dom";

const AuthoringGuidelinesPage = () => (
  <Page>
    <Container>
      <Box mt={3} mb={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} underline="hover" color="inherit" to="/">
            TESSA
          </MuiLink>
          <Typography color="text.primary">Authoring Guidelines</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography component="h1" variant="h3" align="center">
            Authoring Guidelines
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default AuthoringGuidelinesPage;
