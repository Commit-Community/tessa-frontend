import { Button } from "@mui/material";

export const signInURL = `${process.env.REACT_APP_API_ORIGIN}/auth/github/login/`;

const SignInButton = ({ ...buttonProps }) => (
  <Button component="a" href={signInURL} {...buttonProps}>
    Sign in with GitHub
  </Button>
);

export default SignInButton;
