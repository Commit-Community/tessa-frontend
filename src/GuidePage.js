import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { fetchFacets, fetchSkills } from "./api";
import Page from "./Page";
import GuideSkillFacet from "./GuideSkillFacet";
import { useLocalStorage } from "./useLocalStorage";

const GuidePage = () => {
  const { step } = useParams();
  const stepNumber = Number(step);
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const [skillId, setSkillId] = useLocalStorage("guide:skillId", null);
  const [facetId, setFacetId] = useLocalStorage("guide:facetId", null);
  const {
    data: skills,
    isError: isErrorSkills,
    isLoading: isLoadingSkills,
    isSuccess: isSuccessSkills,
  } = useQuery("skills", fetchSkills);
  const {
    data: facets,
    isError: isErrorFacets,
    isLoading: isLoadingFacets,
    isSuccess: isSuccessFacets,
  } = useQuery("facets", fetchFacets);
  let isValidStep,
    skillIndex,
    facetIndex,
    nextStep,
    previousStep,
    nextSkillStep,
    totalSteps,
    skill,
    facet;
  if (isSuccessFacets && isSuccessSkills) {
    totalSteps = skills.length * facets.length;
    isValidStep = stepNumber <= totalSteps;
    skillIndex = Math.floor((stepNumber - 1) / facets.length);
    facetIndex = (stepNumber - 1) % facets.length;
    nextStep = stepNumber + 1;
    previousStep = stepNumber - 1;
    nextSkillStep = stepNumber + facets.length - facetIndex;
    skill = skills[skillIndex];
    facet = facets[facetIndex];
  }
  useEffect(() => {
    if (isFinished) {
      setSkillId(null);
      setFacetId(null);
      if (skillId === null && facetId === null) navigate("/reflections/");
    } else {
      if (skill) setSkillId(skill.id);
      if (facet) setFacetId(facet.id);
    }
  }, [
    skill,
    facet,
    skillId,
    facetId,
    setSkillId,
    setFacetId,
    isFinished,
    navigate,
  ]);
  return (
    <Page>
      <Container>
        <Box mt={3} mb={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink component={Link} underline="hover" color="inherit" to="/">
              TESSA
            </MuiLink>
            <MuiLink
              component={Link}
              underline="hover"
              color="inherit"
              to="/guide/"
            >
              Guided Self-Reflection
            </MuiLink>
            <Typography color="text.primary">Step {step}</Typography>
          </Breadcrumbs>
        </Box>
        {(isErrorFacets || isErrorSkills) && (
          <p>There was a problem loading the page. Sorry!</p>
        )}
        {(isLoadingFacets || isLoadingSkills) && <p>Loading...</p>}
        {isValidStep && (
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
              <GuideSkillFacet skill={skill} facet={facet} />
              <Divider />
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Box>
                  <Button
                    disabled={previousStep < 1}
                    component={Link}
                    variant="outlined"
                    size="large"
                    to={`/guide/${previousStep}/`}
                  >
                    Back
                  </Button>
                </Box>
                <Stack direction="row" spacing={2}>
                  {stepNumber < totalSteps && (
                    <Button
                      disabled={nextSkillStep > totalSteps}
                      component={Link}
                      variant="outlined"
                      size="large"
                      to={`/guide/${nextSkillStep}/`}
                    >
                      Skip skill
                    </Button>
                  )}
                  {nextStep <= totalSteps && (
                    <Button
                      component={Link}
                      variant="contained"
                      size="large"
                      to={`/guide/${nextStep}/`}
                    >
                      Next
                    </Button>
                  )}
                  {stepNumber === totalSteps && (
                    <Button
                      onClick={() => setIsFinished(true)}
                      variant="contained"
                      size="large"
                      color="warning"
                    >
                      Finish 🎉
                    </Button>
                  )}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
};

export default GuidePage;
