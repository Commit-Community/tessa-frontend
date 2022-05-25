import { Container, Grid, Typography } from "@mui/material";

import Page from "./Page";

const TermsOfUsePage = () => (
  <Page>
    <Container sx={{ py: 6 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Typography component="h1" variant="h3" align="center">
            Terms of Use
          </Typography>
          <p>Last updated May 25, 2022</p>
          <p>
            The Technologist Essential Skills Self-Awareness (TESSA) website
            located at{" "}
            <a href="https://tessa.commit.community/">
              https://tessa.commit.community
            </a>{" "}
            is a copyrighted work belonging to Commit Solutions Inc. (Commit).
            Some features of TESSA are subject to additional guidelines, terms,
            or rules, which will be noted in connection with those features.
          </p>
          <h2>Access to the site</h2>
          <p>
            You may only use TESSA for personal, non-commercial reasons. Commit
            reserves the right to change, suspend, or take down TESSA without
            notice. Commit has no obligation to provide you with any support in
            connection with TESSA.
          </p>
          <h2>User content</h2>
          <p>
            "Public content" means any information that you submit to TESSA that
            can be seen by users who are not logged in. You are responsible for
            your public content, and bear all risks associated with publishing
            it. Other users have the ability to modify or replace content you
            submit, and they will bear the risks associated with those changes.
          </p>
          <p>
            You assign to Commit the copyright of all public content that you
            submit. It is published anonymously, but who submitted what content
            is tracked in accordance with the{" "}
            <a href="/privacy-policy/">Privacy Policy</a>.
          </p>
          <p>
            Commit is not obliged to backup any content that you submit. Your
            content may be deleted at any time without notice.
          </p>
          <h2>Acceptable use policy</h2>
          <p>
            You agree not to use TESSA to collect, upload, transmit, display, or
            distribute any content that:
          </p>
          <ul>
            <li>is unlawful in any way,</li>
            <li>violates any intellectual property right,</li>
            <li>
              links to a product or service for personal gain (such as an
              affiliate link),
            </li>
            <li>is invasive of another's privacy,</li>
            <li>or is false or intentionally misleading.</li>
          </ul>
          <p>
            Content is reviewed periodically, and may be removed or modified if
            it violates this policy. In cases of clearly intentional violation
            your account will be disabled.
          </p>
          <h2>Third-party links</h2>
          <p>
            Some content may link to third-party websites. When you click on
            such a link, you do so at your own risk, and should apply a suitable
            level of caution and discretion in doing so.
          </p>
          <h2>Updates to the Terms of Use</h2>
          <p>
            These Terms of Use may be updated from time to time. When they are
            updated, there will be a new "last updated" date at the top of this
            page.
          </p>
          <p>
            If the operators of TESSA think that an update significantly affects
            users' rights, a notice of the update will appear on other pages of
            the website.
          </p>
          <h2 id="contact-us">Contact us</h2>
          <p>
            If you have any questions about these Terms of Use, please email{" "}
            <a href="mailto:privacy@commit.dev">privacy@commit.dev</a>.
          </p>
        </Grid>
      </Grid>
    </Container>
  </Page>
);

export default TermsOfUsePage;
