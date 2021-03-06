import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Page from "./Page";
import ClickWrapAgreement from "./ClickWrapAgreement";
import { createSkill } from "./api";

const NewSkillPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { error, isError, isLoading, mutate, reset } = useMutation(
    createSkill,
    {
      onSuccess: (skill) => {
        queryClient.invalidateQueries("skills", { exact: true });
        navigate(`/skills/${skill.id}/`, { replace: true });
      },
    }
  );
  return (
    <Page>
      <Container>
        <Box mt={3} mb={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink component={Link} underline="hover" color="inherit" to="/">
              TESSA
            </MuiLink>
            <MuiLink
              component={Link}
              underline="hover"
              color="inherit"
              to="/skills/"
            >
              Skills
            </MuiLink>
            <Typography color="text.primary">New Skill</Typography>
          </Breadcrumbs>
        </Box>
        <Typography component="h1" variant="h3" mb>
          Add a new essential skill
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{ maxWidth: "30em", mb: 9 }}
        >
          Describing essential skills is the core purpose of TESSA. If you've
          identified an essential skill that is not yet documented, you're in
          the right place!
        </Typography>
        <Grid container columnSpacing={3} rowSpacing={6}>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="h2" variant="h4" mb>
              How to write a skill name
            </Typography>
            <p>
              Consistency in how skill names are written will help users scan
              for skills they're interested in reading more about.
            </p>
            <p>
              Skill names are written as answers to the question, "What are you
              doing when you use this skill?"
            </p>
            <p>
              Examples include, "Using inclusive language", "Giving structured
              feedback", and "Asking for help".
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="h2" variant="h4" mb>
              How to write a short description
            </Typography>
            <p>
              Short descriptions are single sentences that help users scanning
              through skills to understand more clearly what the skill name
              refers to.
            </p>
            <p>
              Short descriptions are also written as answers to the question,
              "What are you doing when you use this skill?" They clarify how the
              skill is uniquely applied by technologists.
            </p>
            <p>
              An example of a description for the skill name "Using plain
              language" is, "Communicating effectively with non-technical
              readers by avoiding jargon and structuring information simply."
            </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined">
              {isError && (
                <Box px={2.5} pt={2.5}>
                  <Alert severity="error" variant="outlined" onClose={reset}>
                    {error.message}
                  </Alert>
                </Box>
              )}
              <Box px={2.5}>
                <ClickWrapAgreement buttonLabel="Create Skill" />
              </Box>
              <Box px={2.5} pb={2.5}>
                <Button
                  variant="contained"
                  onClick={() => mutate({ name, description })}
                  disabled={isLoading}
                >
                  Create Skill
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default NewSkillPage;
