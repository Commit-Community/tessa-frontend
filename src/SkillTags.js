import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

import { createSkillTag, deleteSkillTag } from "./api";
import useSession from "./useSession";

const SkillTags = ({ tags, skillId }) => {
  const queryClient = useQueryClient();
  const { isAuthor } = useSession();
  const [isAdding, setIsAdding] = useState(false);
  const [tagName, setTagName] = useState("");
  const invalidateCachedSkill = () => {
    queryClient.invalidateQueries("skills", { exact: true });
    queryClient.invalidateQueries(["skills", skillId]);
  };
  const { mutate: deleteSkillTagMutation } = useMutation(deleteSkillTag, {
    onSuccess: invalidateCachedSkill,
  });
  const { isLoading: isCreatingSkillTag, mutate: createSkillTagMutation } =
    useMutation(createSkillTag, {
      onSuccess: () => {
        setTagName("");
        setIsAdding(false);
        invalidateCachedSkill();
      },
    });
  return (
    <>
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.name}
          size="small"
          sx={{ mr: 1 }}
          onDelete={
            isAuthor && (() => deleteSkillTagMutation({ skillId, tagId: tag.id }))
          }
        />
      ))}
      {isAuthor && !isAdding && (
        <Button size="small" onClick={() => setIsAdding(true)}>
          + Add tag
        </Button>
      )}
      {isAuthor && isAdding && (
        <Box mt={2} maxWidth={480}>
          <TextField
            disabled={isCreatingSkillTag}
            size="small"
            label="Tag name"
            fullWidth
            onChange={(event) => setTagName(event.target.value)}
            value={tagName}
            variant="filled"
          />
          <Stack mt={1} direction="row" spacing={1} justifyContent="flex-end">
            <Button
              disabled={isCreatingSkillTag}
              size="small"
              variant="outlined"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={isCreatingSkillTag}
              size="small"
              variant="contained"
              onClick={() => createSkillTagMutation({ skillId, tagName })}
            >
              Save
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default SkillTags;
