import {
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

import Page from "./Page";
import useApiData from "./useApiData";
import Recommendation from "./Recommendation";

const SkillPage = () => {
  const { id: skillId } = useParams();
  const {
    data: skill,
    skillError,
    isSkillLoading,
  } = useApiData({ path: `/skills/${skillId}` });
  const {
    data: facets,
    facetsError,
    isFacetsLoading,
  } = useApiData({ path: `/facets` });
  const {
    data: statements,
    statementsError,
    isStatementsLoading,
  } = useApiData({ path: `/statements` });
  return (
    <Page>
      <Container sx={{ py: 6 }}>
        {(isSkillLoading || isFacetsLoading || isStatementsLoading) &&
          "Loading..."}
        {(skillError || facetsError || statementsError) &&
          "There was an error loading the page."}
        {skill && facets && statements && (
          <>
            <Typography component="h1" variant="h3" mb>
              {skill.name}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: "30em" }} mb={12}>
              {skill.description}
            </Typography>
            {facets && (
              <Grid container columnSpacing={3} rowSpacing={9}>
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
                        <FormControl>
                          <FormLabel
                            id={`skill-${skill.id}-facet-${facet.id}-statements`}
                          >
                            Which statement reflects you the best?
                          </FormLabel>
                          <RadioGroup
                            aria-labelledby={`skill-${skill.id}-facet-${facet.id}-statements`}
                            name={`skill-${skill.id}-facet-${facet.id}-statement`}
                          >
                            {facetStatements.map((statement) => (
                              <FormControlLabel
                                key={statement.id}
                                value={statement.id}
                                control={<Radio />}
                                label={`“${statement.assertion}”`}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography component="h3" variant="h5" my={1}>
                          {facet.recommendation_prompt}
                        </Typography>
                        {facetRecommendations.length === 0 && (
                          <Typography color="secondary" my={3}>
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
                          prompt={facet.recommendation_prompt}
                          skillId={skill.id}
                          facetId={facet.id}
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
