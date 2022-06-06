import { Component, Fragment } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Fragment>
          <h1>:&lt;</h1>
          <p>
            Something went wrong when trying to show the application. Sorry for
            the inconvenience.
          </p>
        </Fragment>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
