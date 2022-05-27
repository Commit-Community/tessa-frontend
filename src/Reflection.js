import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import useApiData from "./useApiData";
import { useState } from "react";

const Reflection = ({ disabled, skillId, facetId, statements }) => {
  const [lastUpdatedAt, setLastUpdatedAt] = useState(Date.now());
  const [isSaving, setIsSaving] = useState(false);
  const { data: latestReflectionForSkillFacet, isLoading } = useApiData({
    deps: [lastUpdatedAt],
    path: `/reflections/latest/skills/${skillId}/facets/${facetId}`,
  });
  const saveReflection = (event) => {
    setIsSaving(true);
    const newStatementId = event.target.value;
    fetch(`${process.env.REACT_APP_API_ORIGIN}/reflections`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skill_id: skillId,
        facet_id: facetId,
        statement_id: newStatementId,
      }),
    }).then(() => {
      setIsSaving(false);
      setLastUpdatedAt(Date.now());
    });
  };
  return (
    <FormControl disabled={disabled || isLoading || isSaving}>
      <FormLabel
        id={`skill-${skillId}-facet-${facetId}-statements`}
        sx={{ mb: 1 }}
      >
        Which statement reflects you the best right now?
      </FormLabel>
      <RadioGroup
        aria-labelledby={`skill-${skillId}-facet-${facetId}-statements`}
        name={`skill-${skillId}-facet-${facetId}-statement`}
        onChange={saveReflection}
        value={
          latestReflectionForSkillFacet
            ? latestReflectionForSkillFacet.statement_id
            : null
        }
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
