import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Grid,
  Link as MuiLink,
  Skeleton,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

import { fetchSkills } from "./api";
import Page from "./Page";
import SkillCard from "./SkillCard";
import useSession from "./useSession";

const SkillsPage = () => {
  const { isAuthor } = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const isFiltered = searchParams.has("tags");
  const searchTags = searchParams.getAll("tags");
  const {
    data: skills,
    isError,
    isLoading,
    isSuccess,
  } = useQuery("skills", fetchSkills);
  return (
    <Page>
      <Container>
        <Box mt={3} mb={12}>
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink component={Link} underline="hover" color="inherit" to="/">
              TESSA
            </MuiLink>
            <Typography color="text.primary">Skills</Typography>
          </Breadcrumbs>
        </Box>
        <Typography component="h1" variant="h3" mb>
          Skills
        </Typography>
        <Typography component="p" variant="body1" sx={{ maxWidth: "30em" }}>
          This page lists all of the essential skills that have been documented
          in TESSA.
        </Typography>
        {searchTags.length > 0 && (
          <Box my={6}>
            Showing skills tagged with:{" "}
            {searchTags.map((searchTag) => (
              <Chip
                key={searchTag}
                label={searchTag}
                sx={{ mr: 1 }}
                onDelete={() => {
                  const newSearchParams = new URLSearchParams();
                  for (const [key, value] of searchParams) {
                    const isBeingRemoved =
                      key === "tags" && value === searchTag;
                    if (!isBeingRemoved) {
                      newSearchParams.append(key, value);
                    }
                  }
                  setSearchParams(newSearchParams);
                }}
              />
            ))}
          </Box>
        )}
        <Grid container spacing={2} sx={{ my: 3 }}>
          {isLoading && (
            <Fragment>
              <Grid item xs={12} md={6} lg={4}>
                <Skeleton height={220} variant="rectangular" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Skeleton height={220} variant="rectangular" />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <Skeleton height={220} variant="rectangular" />
              </Grid>
            </Fragment>
          )}
          {isError && (
            <Grid item xs={12} sm={6}>
              <Alert severity="error" variant="outlined">
                <AlertTitle>Failed to fetch skills list</AlertTitle>
                <p>
                  A problem occurred when trying to fetch the list of skills.
                  You can refresh the page to try again.
                </p>
              </Alert>
            </Grid>
          )}
          {isSuccess &&
            skills
              .filter(({ tags }) =>
                isFiltered
                  ? searchTags.every(
                      (searchTag) =>
                        tags.findIndex(({ name }) => name === searchTag) !== -1
                    )
                  : true
              )
              .map((skill) => (
                <Grid item key={skill.id} xs={12} md={6} lg={4}>
                  <SkillCard skill={skill} />
                </Grid>
              ))}
          {isAuthor && (
            <Grid item xs={12} md={6} lg={4}>
              <Box display="flex" justifyContent="center">
                <Button
                  component={Link}
                  to="/new-skill/"
                  variant="contained"
                  sx={{ my: 11.5 }}
                >
                  + Add New Skill
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default SkillsPage;
