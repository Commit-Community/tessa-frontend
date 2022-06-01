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

const HomePage = () => (
  <Page>
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
          <Box mb={8} textAlign="center">
            <Button
              component={Link}
              to="/skills/"
              variant="contained"
              size="large"
            >
              View All Skills
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default HomePage;
