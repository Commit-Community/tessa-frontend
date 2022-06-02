import {
  Alert,
  Box,
  Button,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { Fragment, useState } from "react";

import ClickWrapAgreement from "./ClickWrapAgreement";
import useSession from "./useSession";
import { updateSkill } from "./api";

export const SkillHeaderSkeleton = () => (
  <Box>
    <Typography component="h1" variant="h3" mb>
      <Skeleton />
    </Typography>
    <Typography variant="body1" sx={{ maxWidth: "30em" }}>
      <Skeleton />
    </Typography>
  </Box>
);

const SkillHeader = ({
  id,
  name: defaultName,
  description: defaultDescription,
}) => {
  const { isAuthor } = useSession();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const { error, isError, isLoading, mutate, reset } = useMutation(
    updateSkill,
    {
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries("skills", { exact: true });
        queryClient.invalidateQueries(["skills", id]);
      },
    }
  );
  return isEditing ? (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="Skill name"
        variant="filled"
        disabled={isLoading}
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
        disabled={isLoading}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Box>
        {isError && (
          <Alert severity="error" variant="outlined" onClose={reset}>
            {error.message}
          </Alert>
        )}
        <ClickWrapAgreement buttonLabel="Save" justifyContent="flex-end" />
        <Stack justifyContent="flex-end" direction="row" spacing={1}>
          <Button
            disabled={isLoading}
            onClick={() => {
              setName(defaultName);
              setDescription(defaultDescription);
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
            onClick={() => mutate({ id, name, description })}
            variant="contained"
            size="small"
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Stack>
  ) : (
    <Fragment>
      <Typography component="h1" variant="h3" mb>
        <Box component="span" mr={2}>
          {name}
        </Box>
        {isAuthor && (
          <Button onClick={() => setIsEditing(true)} size="small">
            Edit
          </Button>
        )}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: "30em" }}>
        {description}
      </Typography>
    </Fragment>
  );
};

export default SkillHeader;
