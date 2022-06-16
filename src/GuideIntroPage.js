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
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

import { fetchFacets, fetchSkills } from "./api";
import Page from "./Page";
import { useLocalStorage } from "./useLocalStorage";

const GuideIntroPage = () => {
  const [step, setStep] = useState(1);
  const [skillId] = useLocalStorage("guide:skillId", null);
  const [facetId] = useLocalStorage("guide:facetId", null);
  const {
    data: skills,
    isLoading: isLoadingSkills,
    isSuccess: isSuccessSkills,
  } = useQuery("skills", fetchSkills);
  const {
    data: facets,
    isLoading: isLoadingFacets,
    isSuccess: isSuccessFacets,
  } = useQuery("facets", fetchFacets);
  useEffect(() => {
    if (isSuccessFacets && isSuccessSkills && skillId && facetId) {
      const skillIndex = skills.findIndex((s) => s.id === skillId);
      const facetIndex = facets.findIndex((f) => f.id === facetId);
      setStep(Math.max(1, 1 + facetIndex + skillIndex * facets.length));
    }
  }, [isSuccessSkills, isSuccessFacets, skills, facets, skillId, facetId]);
  return (
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
              We're going to go through all the essential skills in TESSA to
              find some that you're excited to develop!
            </Typography>
            <Box mt={8} textAlign="center">
              <Button
                disabled={isLoadingFacets || isLoadingSkills}
                component={Link}
                color="warning"
                size="large"
                variant="contained"
                to={`/guide/${step}/`}
              >
                {skillId && facetId ? "Resume" : "Begin"} guided self-reflection
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default GuideIntroPage;
