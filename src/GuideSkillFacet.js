import { Box, Link as MuiLink, Typography } from "@mui/material";
import { useQuery } from "react-query";

import { fetchSkill, fetchStatements } from "./api";
import Reflection from "./Reflection";
import Recommendation from "./Recommendation";
import useSession from "./useSession";
import { signInURL } from "./SignInButton";

const GuideSkillFacet = ({ skill, facet }) => {
  const { isAnonymous, isUser } = useSession();
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
      <Typography component="h1" variant="h5" mb={9}>
        Reflect on the{" "}
        <Typography color="secondary" component="span" variant="h5">
          {facet.name.toLocaleLowerCase()}
        </Typography>{" "}
        aspect of the skill<br />
        <Typography
          color="primary"
          component="span"
          variant="h5"
          fontWeight="bold"
        >
          {skill.name}:
        </Typography>{" "}
        <Typography color="primary" component="span" variant="h5">
          {skill.description}
        </Typography>
      </Typography>
      <Typography component="p" variant="h5" mb>
        Ask yourself:
      </Typography>
      {isSuccessRecommendations && isSuccessStatements && (
        <>
          <Box mb={9}>
            <Typography component="p" variant="body1" mb={3}>
              {facet.recommendation_prompt}
            </Typography>
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
          <Typography component="p" variant="h5" mb>
            Then, about the{" "}
            <Typography color="secondary" component="span" variant="h5">
              {facet.name.toLocaleLowerCase()}
            </Typography>{" "}
            aspect of the skill, select:
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
              <MuiLink href={signInURL}>Sign in</MuiLink> to save your
              reflection.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default GuideSkillFacet;
