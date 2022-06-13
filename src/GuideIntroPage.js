import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import Page from "./Page";

const GuideIntroPage = () => (
  <Page>
    <Container>
      <Box mt={3} mb={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} underline="hover" color="inherit" to="/">
            TESSA
          </MuiLink>
          <Typography color="text.primary">Guided Self-Reflection</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography component="h1" variant="h3" my={6} align="center">
            Welcome to the guided self-reflection tool!
          </Typography>
          <Typography component="p" variant="h5" align="center">
            We're going to go through all the essential skills in TESSA to find
            some that you're excited to develop!
          </Typography>
          <Box mt={8} textAlign="center">
            <Button
              component={Link}
              color="warning"
              size="large"
              variant="contained"
              to="/guide/1/"
            >
              Begin guided self-reflection
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default GuideIntroPage;
