import { FC } from "react";
import styles from "./error-page.module.css";
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
  return (
    <div className={styles.errorPageWrapper}>
      <h1 className={styles.errorPageHeader}>I have bad news for you</h1>
      <p className={styles.errorPageText}>
        The page you are looking for might be removed or is temporarily
        unavailable
      </p>
      <Link to="/" className={styles.errorPageLink}>
        Back to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;
