import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { createReflection, fetchLatestReflectionForSkillFacet } from "./api";

const Reflection = ({ disabled, skillId, facetId, statements }) => {
  const queryClient = useQueryClient();
  const queryKey = ["latestReflectionForSkillFacet", skillId, facetId];
  const { data: reflection, isLoading } = useQuery(
    queryKey,
    fetchLatestReflectionForSkillFacet
  );
  const { mutate } = useMutation(createReflection, {
    onMutate: async (newReflection) => {
      await queryClient.cancelQueries(queryKey);
      const previousReflection = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, newReflection);
      return { newReflection, previousReflection };
    },
    onError: (err, newReflection, context) => {
      queryClient.setQueryData(queryKey, context.previousReflection);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("skillsByFacetStatements");
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
  return (
    <FormControl disabled={disabled || isLoading}>
      <FormLabel
        id={`skill-${skillId}-facet-${facetId}-statements`}
        sx={{ mb: 1 }}
      >
        Which statement reflects you the best right now?
      </FormLabel>
      <RadioGroup
        aria-labelledby={`skill-${skillId}-facet-${facetId}-statements`}
        name={`skill-${skillId}-facet-${facetId}-statement`}
        onChange={(event) =>
          mutate({
            skill_id: skillId,
            facet_id: facetId,
            statement_id: event.target.value,
          })
        }
        value={reflection ? reflection.statement_id : null}
      >
        {statements.map((statement) => (
          <FormControlLabel
            key={statement.id}
            value={statement.id}
            control={<Radio />}
            label={`"${statement.assertion}"`}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Reflection;
