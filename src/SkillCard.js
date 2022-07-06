import { Card, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const SkillCard = ({ skill }) => (
  <Card variant="outlined" sx={{ p: 3 }}>
    <Typography
      component="h2"
      variant="h6"
      lineHeight={1.25}
      mb
      minHeight="2.5em"
    >
      <MuiLink
        component={Link}
        to={`/skills/${skill.id}/`}
        underline="none"
        color="inherit"
      >
        {skill.name}
      </MuiLink>
    </Typography>
    <Typography variant="body2" mb={3} lineHeight={1.5} minHeight="4.5em">
      {skill.description}
    </Typography>
    <Typography variant="button">
      <MuiLink component={Link} to={`/skills/${skill.id}/`} underline="none">
        View skill
      </MuiLink>
    </Typography>
  </Card>
);

export default SkillCard;
