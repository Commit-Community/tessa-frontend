import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import Page from "./Page";

const GuideIntroPage = () => (
  <Page>
    <Container sx={{ py: 12 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Typography
            component="h1"
            variant="h3"
            my={6}
            align="center"
          >
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
              Begin guided reflection
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default GuideIntroPage;
