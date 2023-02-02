import styles from "./protectedroute.module.css";
import { useSelector } from "../../utils/hooks/useSelector";
import { Redirect, Route, useLocation } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { FC, ReactNode } from "react";

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children?: ReactNode;
  props?: {};
  exact?: boolean;
  path: string;
};

type TFrom = { from: { pathname: string } };

const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth,
  children,
  ...props
}) => {
  const isUser = useSelector((store) => store.user.data);
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const location = useLocation<TFrom>();

  if (!isAuthChecked) {
    <BounceLoader
      className={styles.loader}
      color="#4C4CFF"
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />;
  }

  if (onlyUnAuth && isUser) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (!onlyUnAuth && !isUser) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...props}>{children}</Route>;
};

export default ProtectedRoute;
