# TESSA Frontend

The TESSA frontend is deployed to <https://tessa.commit.community>.

## Getting Started

### 1. Set up [tessa-backend](https://github.com/Commit-Community/tessa-backend)

The [tessa-frontend](https://github.com/Commit-Community/tessa-frontend) project
requires the [tessa-backend](https://github.com/Commit-Community/tessa-backend)
project to be running during development. Follow the instructions in the
"Getting Started" section of the
[`README.md`](https://github.com/Commit-Community/tessa-backend/blob/main/README.md#getting-started)
file in that repo.

### 2. Create the local environment variables

Environment variables needed during development are specified in the
`.env.example` file, following the convention from Create React App's docs on
[Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used).

To use the example variables, copy the `.env.example` file to a file
called `.env`.

```
cp .env.example .env
```

### 3. Install dependencies and run the development server

TESSA Frontend is a React app, using
[react-scripts](https://www.npmjs.com/package/react-scripts) from
[Create React App](https://github.com/facebook/create-react-app). To improve
compatibility, it should only be run against the version of Node.js specified in
the `.nvmrc` file. If you have [NVM](https://github.com/nvm-sh/nvm) installed,
to use the configured version of Node, run:

```
nvm use
```

With the right version of Node installed, the next step is to install the
dependencies. To do that, run:

```
npm install
```

Finally, run the server with:

```
npm start
```

## GitHub Actions

### Pull Request

Pull requests run a workflow which runs unit tests and checks the code for lint
before permitting PRs to be merged.

To check your code before merging, use the following commands.

Run unit tests with Jest.

```
npm test
```

Check formatting with Prettier.

```
npm run format
```

Check for lint with ESLint.

```
npm run lint
```

Automatically fix formatting errors.

```
npm run format:fix
```

Automatically fix some lint errors.

```
npm run lint:fix
```

### CI

This repository has an end-to-end CI/CD pipeline that runs whenever new commits
are pushed to the `main` branch. It includes the following steps.

1. Checkout
2. Unit test
3. Build artifact
4. Sync artifact to S3
