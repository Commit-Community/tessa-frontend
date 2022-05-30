import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

import SessionContext from "./SessionContext";
import ClickWrapAgreement from "./ClickWrapAgreement";

const SkillHeader = ({
  id,
  name: defaultName,
  description: defaultDescription,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { isAuthor } = useContext(SessionContext);
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const handleSave = () => {
    fetch(`${process.env.REACT_APP_API_ORIGIN}/skills/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    }).then(
      () => {
        setIsSaving(false);
        setIsEditing(false);
      },
      () => {
        setIsSaving(false);
      }
    );
  };
  return isEditing ? (
    <Stack spacing={3} mb={12}>
      <TextField
        fullWidth
        label="Skill name"
        variant="filled"
        InputProps={{ style: { fontSize: 22 } }}
        InputLabelProps={{ style: { fontSize: 22 } }}
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        fullWidth
        label="Short description"
        variant="filled"
        multiline
        rows={2}
        maxLength={255}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Box>
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
    </Stack>
  ) : (
    <Box mb={12}>
      <Typography component="h1" variant="h3" mb>
        {name}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "30em" }}>
        {description}
      </Typography>
      {isAuthor && (
        <Box my={3}>
          <Button onClick={() => setIsEditing(true)} size="small">
            Edit Skill
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SkillHeader;
