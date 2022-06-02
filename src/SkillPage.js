import { Box, Container, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchFacets, fetchSkill, fetchStatements } from "./api";
import Page from "./Page";
import Recommendation from "./Recommendation";
import Reflection from "./Reflection";
import SkillHeader from "./SkillHeader";
import useSession from "./useSession";

const SkillPage = () => {
  const { id: skillId } = useParams();
  const { isUser, isAnonymous } = useSession();
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now());
  const {
    data: skill,
    error: skillError,
    isLoading: isSkillLoading,
  } = useQuery(["skills", skillId], fetchSkill);
  const {
    data: facets,
    error: facetsError,
    isLoading: isFacetsLoading,
  } = useQuery("facets", fetchFacets);
  const {
    data: statements,
    error: statementsError,
    isLoading: isStatementsLoading,
  } = useQuery("statements", fetchStatements);
  return (
    <Page>
      <Container sx={{ py: 4 }}>
        {(isSkillLoading || isFacetsLoading || isStatementsLoading) &&
          "Loading..."}
        {(skillError || facetsError || statementsError) &&
          "There was an error loading the page."}
        {skill && facets && statements && (
          <>
            <Box
              mb={10}
              py={2}
              sx={{
                background: "linear-gradient(90deg, #0f1011 0%, #010242 100%)",
                backgroundPosition: "50% 50%",
                backgroundSize: "100vw 100vh",
                position: "sticky",
                top: 0,
                zIndex: 2,
              }}
            >
              <SkillHeader
                id={skill.id}
                name={skill.name}
                description={skill.description}
              />
            </Box>
            {facets && (
              <Grid
                container
                columnSpacing={3}
                rowSpacing={9}
                sx={{ position: "relative", zIndex: 1 }}
              >
                {facets.map((facet) => {
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
                          skillId={skill.id}
                          statements={facetStatements}
                        />
                        {isAnonymous && (
                          <Typography
                            component="p"
                            variant="body2"
                            color="primary"
                            sx={{ mt: 2 }}
                          >
                            Sign in to save your response.
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
                                skillId={skill.id}
                                facetId={facet.id}
                              />
                            ))}
                          </>
                        )}
                        <Recommendation
                          key={lastUpdatedAt}
                          prompt={facet.recommendation_prompt}
                          skillId={skill.id}
                          facetId={facet.id}
                          onSave={() => setLastUpdatedAt(Date.now())}
                        />
                      </Grid>
                    </Fragment>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Container>
    </Page>
  );
};

export default SkillPage;
