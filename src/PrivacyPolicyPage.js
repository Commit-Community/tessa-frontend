import { Box, Breadcrumbs, Container, Grid, Link as MuiLink, Typography } from "@mui/material";

import Page from "./Page";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => (
  <Page>
    <Container>
      <Box mt={3} mb={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink component={Link} underline="hover" color="inherit" to="/">
            TESSA
          </MuiLink>
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography component="h1" variant="h3" align="center">
            Privacy Policy
          </Typography>
          <p>Last updated May 24, 2022</p>
          <p>
            This Privacy Policy document describes the types of information that
            is collected and recorded by the website Technologist Essential
            Skills Self-Awareness (TESSA), accessible from{" "}
            <a href="https://tessa.commit.community/">
              https://tessa.commit.community
            </a>
            , and how it is used. TESSA is owned and operated by Commit
            Solutions, Inc..
          </p>
          <p>
            If you have questions that aren't answered by this Privacy Policy,{" "}
            <a href="#contact-us">contact us</a>.
          </p>
          <h2>Consent</h2>
          <p>
            By using TESSA, you consent to the Privacy Policy and agree to its
            terms.
          </p>
          <h2>Information TESSA collects</h2>
          <p>
            When you register for an account by signing in with GitHub, TESSA
            retrieves public information about your GitHub account, including
            your GitHub username and user ID. These are collected so that you
            can be uniquely identified across usage sessions.
          </p>
          <p>
            Users who are authorized to contribute public content may submit
            content that adheres to Commit's{" "}
            <a href="https://docs.commit.dev/about/code-of-conduct">
              Code of Conduct
            </a>
            . Contributing public content is voluntary, and must not include the
            personal information of the author or anyone else.
          </p>
          <h2>How your information is used</h2>
          <p>
            The information collected is used in various ways, including to:
          </p>
          <ul>
            <li>provide personalized features,</li>
            <li>find and prevent abuse,</li>
            <li>and analyze the usage of the software.</li>
          </ul>
          <h2>Log files</h2>
          <p>
            TESSA follows a standard procedure of using log files. The
            information collected by log files typically include internet
            protocol (IP) addresses, browser type, date and time stamp, and
            referring/exit pages. These are not linked to any information that
            is personally identifiable.
          </p>
          <p>The purpose of the information is for:</p>
          <ul>
            <li>analyzing trends in website usage,</li>
            <li>administering the site,</li>
            <li>and gathering statistical information.</li>
          </ul>
          <h2>Cookies</h2>
          <p>
            TESSA uses cookies to keep track of usage sessions. When you visit
            TESSA, your browser stores a unique cookie that tells the software
            if you are logged in, and if so, the specific user account that you
            logged in with. This information is used to determine which features
            of TESSA you are allowed to access.
          </p>
          <h2>Updates to the Privacy Policy</h2>
          <p>
            This Privacy Policy may be updated from time to time. When it is
            updated, there will be a new "last updated" date at the top of this
            page.
          </p>
          <p>
            If the operators of TESSA think that an update significantly affects
            users' privacy, a notice of the update will appear on other pages of
            the website.
          </p>
          <h2 id="contact-us">Contact us</h2>
          <p>
            If you have any questions about this Privacy Policy, please email{" "}
            <a href="mailto:privacy@commit.dev">privacy@commit.dev</a>.
          </p>
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default PrivacyPolicyPage;
