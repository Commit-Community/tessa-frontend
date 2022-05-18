import { useContext } from "react";
import SessionContext from "./SessionContext";

const App = () => {
  const { error, isLoading, session } = useContext(SessionContext);
  return (
    <div className="App">
      <header className="App-header">
        <h1>TESSA</h1>
        <h2>Technologist Essential Skills Self-Awareness</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>There was an error determining the status of your session.</p>
        ) : session.userId ? (
          <p>
            Hi, {session.githubUsername}{" "}
            <a href={`${process.env.REACT_APP_API_ORIGIN}/auth/logout`}>
              Sign out
            </a>
          </p>
        ) : (
          <p>
            <a href={`${process.env.REACT_APP_API_ORIGIN}/auth/github/login`}>
              Sign in with GitHub
            </a>
          </p>
        )}
      </header>
    </div>
  );
};

export default App;
