import { Link as MuiLink, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => (
  <Stack mt={24} mb={6} spacing={1} direction="row" justifyContent="center">
    <Typography align="center" color="text.secondary" variant="body2">
      © Commit Solutions Inc.
    </Typography>
    <MuiLink component={Link} to="/privacy-policy/" variant="body2">
      Privacy Policy
    </MuiLink>
    <MuiLink component={Link} to="/terms-of-use/" variant="body2">
      Terms of Use
    </MuiLink>
  </Stack>
);

export default Footer;
