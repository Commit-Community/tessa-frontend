import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";

import { fetchSkill, fetchStatements } from "./api";
import Reflection from "./Reflection";
import Recommendation from "./Recommendation";
import useSession from "./useSession";

const GuideSkillFacet = ({ skill, facet }) => {
  const { isUser } = useSession();
  const {
    data: skillWithRecommendations,
    isSuccess: isSuccessRecommendations,
  } = useQuery(["skills", skill.id], fetchSkill);
  const { recommendations } = skillWithRecommendations || {};
  const { data: statements, isSuccess: isSuccessStatements } = useQuery(
    "statements",
    fetchStatements
  );
  const facetRecommendations =
    isSuccessRecommendations &&
    recommendations.filter(({ facet_id: facetId }) => facetId === facet.id);
  const facetStatements =
    isSuccessStatements &&
    statements.filter(({ facet_id: facetId }) => facetId === facet.id);
  return (
    <Box mb={6}>
      <Typography component="h1" variant="h4" mb={2}>
        Reflect on the{" "}
        <Typography color="primary" component="span" variant="h4">
          {facet.name.toLocaleLowerCase()}
        </Typography>{" "}
        aspect of the skill
      </Typography>
      <Typography
        component="h2"
        variant="h4"
        mb={1}
        fontWeight="bold"
        color="secondary"
      >
        {skill.name}
      </Typography>
      <Typography component="p" variant="body1" mb={12} color="secondary">
        {skill.description}
      </Typography>
      <Typography component="p" variant="h6">
        Ask yourself
      </Typography>
      {isSuccessRecommendations && isSuccessStatements && (
        <>
          <Box mb={12}>
            <Typography component="h3" variant="h5" mb={1}>
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
                    editable={false}
                  />
                ))}
              </>
            )}
          </Box>
          <Reflection
            disabled={!isUser}
            facetId={facet.id}
            skillId={skill.id}
            statements={facetStatements}
          />
        </>
      )}
    </Box>
  );
};

export default GuideSkillFacet;
