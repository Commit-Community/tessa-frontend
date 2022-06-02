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
import { useState } from "react";

import ClickWrapAgreement from "./ClickWrapAgreement";
import useSession from "./useSession";

const md = new MarkdownIt();

const Recommendation = ({
  id: defaultId,
  markdown: defaultMarkdown,
  prompt,
  skillId,
  facetId,
  onSave,
}) => {
  const { isAuthor } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(defaultId);
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState();
  const handleSave = () => {
    setIsSaving(true);
    const url = id
      ? `${process.env.REACT_APP_API_ORIGIN}/recommendations/${id}`
      : `${process.env.REACT_APP_API_ORIGIN}/recommendations`;
    const method = id ? "PUT" : "POST";
    const body = id
      ? JSON.stringify({ markdown })
      : JSON.stringify({ markdown, skill_id: skillId, facet_id: facetId });
    fetch(url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then(
        ({ data, error }) => {
          if (data) {
            setId(data.id);
          }
          setIsSaving(false);
          setSaveError(error);
          if (!error) {
            setIsEditing(false);
            if (typeof onSave === "function") {
              onSave();
            }
          }
        },
        (error) => {
          setIsSaving(false);
          setSaveError(error);
        }
      );
  };
  return isEditing ? (
    <Box mb={2}>
      <TextField
        disabled={isSaving}
        fullWidth
        label={prompt}
        multiline
        rows={10}
        variant="filled"
        value={markdown}
        onChange={(event) => {
          setMarkdown(event.target.value);
        }}
      />
      {saveError && (
        <Alert
          severity="error"
          variant="outlined"
          onClose={() => setSaveError()}
          sx={{ mt: 1 }}
        >
          {saveError.message}
        </Alert>
      )}
      <ClickWrapAgreement buttonLabel="Save" justifyContent="flex-end" />
      <Stack justifyContent="flex-end" direction="row" spacing={1}>
        <Button
          disabled={isSaving}
          onClick={() => setIsEditing(false)}
          variant="outlined"
          size="small"
        >
          Cancel
        </Button>
        <Button
          disabled={isSaving}
          onClick={handleSave}
          variant="contained"
          size="small"
        >
          Save
        </Button>
      </Stack>
    </Box>
  ) : id ? (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <Typography component="div" px={2.5}>
        <div
          dangerouslySetInnerHTML={{
            __html: md.render(markdown),
          }}
        />
      </Typography>
      {isAuthor && (
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
