import { Component, ErrorInfo, ReactNode } from "react";
import styles from "./error-boundary-component.module.css";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleButtonClick() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundaryWrapper}>
          <h1 className={styles.errorBoundaryHeader}>
            Some disturbance in the Force there is. Reload the page, you must.
          </h1>
          <button
            className={styles.errorBoundaryButton}
            onClick={this.handleButtonClick}
          >
            Back
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
