import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import Page from "./Page";
import useSession from "./useSession";

const AuthoringGuidelinesPage = () => {
  const { isAnonymous, isUser, isAuthor } = useSession();
  const isNonAuthor = (isUser && !isAuthor) || isAnonymous;
  return (
    <Page>
      <Container>
        <Box mt={3} mb={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink component={Link} underline="hover" color="inherit" to="/">
              TESSA
            </MuiLink>
            <Typography color="text.primary">Authoring Guidelines</Typography>
          </Breadcrumbs>
        </Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography component="h1" variant="h3" align="center" mb={6}>
              Authoring Guidelines
            </Typography>
            <p>
              Welcome, Commitizen! Thank you for sharing your experience and
              expertise about essential skills. This page outlines expectations
              for when you're writing essential skills and recommendations.
            </p>
            <p>
              If you don't have author access to TESSA, ask for access on the{" "}
              <u>#proj-tessa</u> channel on the Commit Slack workspace.
            </p>
            {isNonAuthor && (
              <Alert severity="info" variant="outlined" sx={{ my: 6 }}>
                <AlertTitle>Are you not a Commitizen?</AlertTitle>
                <p>
                  The content on TESSA is collected from members of the{" "}
                  <MuiLink href="https://bit.ly/TESSAtoCommit">Commit</MuiLink>{" "}
                  community—Commitizens! If you have wisdom to share, then
                  you're likely a great fit for the community! You can{" "}
                  <MuiLink href="https://bit.ly/TESSAtoCommit">
                    apply now
                  </MuiLink>{" "}
                  on the Commit website.
                </p>
              </Alert>
            )}
            <h2>Types of content</h2>
            <p>
              There are two types of content you can add: skills and
              recommendations.
            </p>
            <ul>
              <li>
                <p>
                  <dfn>Skills</dfn> are short descriptions of strategies,
                  mindsets, or habits that improve productivity and
                  effectiveness as a technologist.
                </p>
              </li>
              <li>
                <p>
                  Each skill is broken down into different aspects, called{" "}
                  <dfn>facets</dfn>. <dfn>Recommendations</dfn> are advice from
                  community members to help answer the self-reflection questions
                  associated with a facet.
                </p>
              </li>
            </ul>
            <h3>Adding skills</h3>
            <p>
              Normally, "essential skills" are defined as high-level groups,
              like "communication" or "teamwork". Those high level definitions
              are not useful for individuals who want to develop them. In TESSA,
              skills reflect actionable behaviours that a technologist can
              practice.
            </p>
            <p>When you add a new skill, make sure:</p>
            <ul>
              <li>
                that there isn't a skill already in the system that is
                substantially similar,
              </li>
              <li>that it reasonably applies to technologists,</li>
              <li>
                that you can think of at least one recommendation for each
                facet, and
              </li>
              <li>
                that the skill name and short description match the style of the
                other skills in the app.
              </li>
            </ul>
            <p>
              A lot of times when you have an idea for a recommendation, there
              will already be a skill that the recommendation is suitable to add
              to. Adding new skills should be relatively rare.
            </p>
            <h3>Adding recommendations</h3>
            <p>
              Recommendations are the most common kind of content to add. They
              are typically a couple sentences offering an answer to a question.
              The question that a recommendation answers is related to a facet
              of a skill. For example, a recommendation for a book will likely
              be an answer to the question "Where can I learn more about this
              skill?" under the "Knowledge level" facet.
            </p>
            <p>
              Keep recommendations short when you can. Make sure that they
              answer the prompt question, and try to explain why the
              recommendation is being given. Explanations are often written as
              examples of someone putting the recommendation to use.
            </p>
            <h2>Writing style</h2>
            <p>
              Make an effort to keep the writing style across skills and
              recommendations consistent. Don't be alarmed if someone rewords
              some content you wrote. It's likely that they are refining it to
              follow these guidelines.
            </p>
            <p>
              Please, make grammar, spelling, and writing style improvements on
              any content that you think needs it. No author information is
              shown on content in TESSA because it's a place to collaborate on
              giving the best advice, not taking credit.
            </p>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default AuthoringGuidelinesPage;
