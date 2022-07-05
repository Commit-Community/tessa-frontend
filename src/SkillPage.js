import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchFacets, fetchSkill, fetchStatements } from "./api";
import Page from "./Page";
import Recommendation from "./Recommendation";
import Reflection from "./Reflection";
import SkillHeader, { SkillHeaderSkeleton } from "./SkillHeader";
import SkillTags from "./SkillTags";
import { signInURL } from "./SignInButton";
import useSession from "./useSession";

const stickyHeaderStyles = {
  backgroundImage: "linear-gradient(90deg, #0f1011 0%, #010242 100%)",
  backgroundPositionX: "50%",
  backgroundSize: "100vw 100%",
  position: "sticky",
  top: 0,
  zIndex: 1,
};

const SkillPage = () => {
  const { id: skillId } = useParams();
  const { isUser, isAnonymous } = useSession();
  const {
    data: skill,
    isError: isErrorSkill,
    isLoading: isLoadingSkill,
    isSuccess: isSuccessSkill,
  } = useQuery(["skills", skillId], fetchSkill);
  const { data: facets } = useQuery("facets", fetchFacets);
  const { data: statements } = useQuery("statements", fetchStatements);
  return (
    <Page>
      <Container>
        <Box mt={3} mb={10}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink component={Link} underline="hover" color="inherit" to="/">
              TESSA
            </MuiLink>
            <MuiLink
              component={Link}
              underline="hover"
              color="inherit"
              to="/skills/"
            >
              Skills
            </MuiLink>
            <Typography color="text.primary">
              {isSuccessSkill && skill.name}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box mb={10} py={2} sx={stickyHeaderStyles}>
          {isLoadingSkill && <SkillHeaderSkeleton />}
          {isErrorSkill && (
            <Alert severity="error" variant="outlined">
              <AlertTitle>Failed to fetch skill info</AlertTitle>
              <p>
                A problem occurred when trying to fetch the details about this
                skill. You can refresh the page to try again.
              </p>
            </Alert>
          )}
          {isSuccessSkill && (
            <>
              <SkillHeader
                id={skillId}
                name={skill.name}
                description={skill.description}
                tags={skill.tags}
              />
              <Box mt={2}>
                <SkillTags tags={skill.tags} skillId={skillId} />
              </Box>
            </>
          )}
        </Box>
        <Grid container columnSpacing={3} rowSpacing={9}>
          {facets &&
            statements &&
            skill &&
            facets.map((facet) => {
              const facetRecommendations = skill.recommendations.filter(
                ({ facet_id: facetId }) => facetId === facet.id
              );
              const facetStatements = statements.filter(
                ({ facet_id: facetId }) => facetId === facet.id
              );
              return (
                <Fragment key={facet.id}>
                  <Grid item xs={12} md={6}>
                    <Typography component="h2" variant="h4" mb={2}>
                      {facet.name}
                    </Typography>
                    <Reflection
                      disabled={!isUser}
                      facetId={facet.id}
                      skillId={skillId}
                      statements={facetStatements}
                    />
                    {isAnonymous && (
                      <Typography
                        component="p"
                        variant="body2"
                        color="primary"
                        sx={{ mt: 2 }}
                      >
                        <MuiLink href={signInURL}>Sign in</MuiLink> to save your
                        reflection.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography component="h3" variant="h5" my={1}>
                      {facet.recommendation_prompt}
                    </Typography>
                    {facetRecommendations.length === 0 && (
                      <Typography color="secondary" my={2}>
                        No recommendations have been left for this facet.
                      </Typography>
                    )}
                    {facetRecommendations.length > 0 && (
                      <>
                        <Typography
                          component="h4"
                          variant="overline"
                          color="text.secondary"
                        >
                          Community recommendations
                        </Typography>
                        {facetRecommendations.map((recommendation) => (
                          <Recommendation
                            key={recommendation.id}
                            id={recommendation.id}
                            markdown={recommendation.markdown}
                            prompt={facet.recommendation_prompt}
                            skillId={skillId}
                            facetId={facet.id}
                          />
                        ))}
                      </>
                    )}
                    <Recommendation
                      prompt={facet.recommendation_prompt}
                      skillId={skillId}
                      facetId={facet.id}
                    />
                  </Grid>
                </Fragment>
              );
            })}
        </Grid>
      </Container>
    </Page>
  );
};

export default SkillPage;
