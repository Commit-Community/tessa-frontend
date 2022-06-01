import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Page from "./Page";
import ClickWrapAgreement from "./ClickWrapAgreement";
import { useState } from "react";

const NewSkillPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleCreate = () => {
    fetch(`${process.env.REACT_APP_API_ORIGIN}/skills`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then(({ data: skill }) => {
        if (skill) {
          navigate(`/skills/${skill.id}/`, { replace: true });
        }
      });
  };
  return (
    <Page>
      <Container sx={{ py: 6 }}>
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
              maxLength={255}
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
              <Box px={2.5}>
                <ClickWrapAgreement buttonLabel="Create Skill" />
              </Box>
              <Box px={2.5} pb={2.5}>
                <Button variant="contained" onClick={handleCreate}>
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
