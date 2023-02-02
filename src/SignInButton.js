import { Button } from "@mui/material";

export const signInURL = `${process.env.REACT_APP_API_ORIGIN}/auth/github/login/`;

const SignInButton = ({ ...buttonProps }) => (
  <span style={{ cursor: "not-allowed" }} title="Temporarily disabled">
    <Button component="a" disabled={true} href={signInURL} {...buttonProps}>
      Sign in with GitHub
    </Button>
  </span>
);

export default SignInButton;
