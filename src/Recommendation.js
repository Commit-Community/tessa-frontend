import {
  Alert,
  Box,
  Button,
  Card,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MarkdownIt from "markdown-it";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

import ClickWrapAgreement from "./ClickWrapAgreement";
import { saveRecommendation } from "./api";
import useSession from "./useSession";

const md = new MarkdownIt();

const Recommendation = ({
  id,
  markdown: defaultMarkdown,
  prompt,
  skillId,
  facetId,
  editable = true,
}) => {
  const { isAuthor } = useSession();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const { error, isError, isLoading, mutate, reset } = useMutation(
    saveRecommendation,
    {
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries(["skills", skillId]);
      },
    }
  );
  return isEditing ? (
    <Box mb={2}>
      <TextField
        disabled={isLoading}
        fullWidth
        label={prompt}
        multiline
        rows={10}
        variant="filled"
        value={markdown}
        onChange={(event) => setMarkdown(event.target.value)}
      />
      {isError && (
        <Alert
          severity="error"
          variant="outlined"
          onClose={reset}
          sx={{ mt: 1 }}
        >
          {error.message}
        </Alert>
      )}
      <ClickWrapAgreement buttonLabel="Save" justifyContent="flex-end" />
      <Stack justifyContent="flex-end" direction="row" spacing={1}>
        <Button
          disabled={isLoading}
          onClick={() => {
            setMarkdown(defaultMarkdown);
            setIsEditing(false);
            reset();
          }}
          variant="outlined"
          size="small"
        >
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={() =>
            mutate({ id, markdown, skill_id: skillId, facet_id: facetId })
          }
          variant="contained"
          size="small"
        >
          Save
        </Button>
      </Stack>
    </Box>
  ) : id ? (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <Typography component="div" px={1.5}>
        <div
          dangerouslySetInnerHTML={{
            __html: md.render(markdown),
          }}
        />
      </Typography>
      {isAuthor && editable && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", m: 1 }}>
          <Button onClick={() => setIsEditing(true)} size="small">
            Edit
          </Button>
        </Box>
      )}
    </Card>
  ) : (
    isAuthor && (
      <Box mb={2}>
        <Button
          variant="outlined"
          onClick={() => setIsEditing(true)}
          size="small"
        >
          Add new recommendation
        </Button>
      </Box>
    )
  );
};

export default Recommendation;
