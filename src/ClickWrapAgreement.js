import { Link as MuiLink, Typography } from "@mui/material";

const ClickWrapAgreement = ({ buttonLabel, justifyContent = "flex-start" }) => (
  <Typography
    component="p"
    variant="body2"
    display="flex"
    justifyContent={justifyContent}
    py={1}
    my={1}
  >
    <span>
      By clicking "{buttonLabel}", you agree to the{" "}
      <MuiLink href="/privacy-policy/" target="_blank">
        Privacy Policy
      </MuiLink>{" "}
      and{" "}
      <MuiLink href="/terms-of-use/" target="_blank">
        Terms of Use
      </MuiLink>
      .
    </span>
  </Typography>
);

export default ClickWrapAgreement;
