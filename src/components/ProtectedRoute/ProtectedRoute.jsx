import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ onlyUnAuth, children, ...props }) {
  const isUser = useSelector((store) => store.user.data);
  const location = useLocation();

  if (onlyUnAuth && isUser) {
    return <Redirect to="/" />;
  }

  if (!onlyUnAuth && !isUser) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...props}>{children}</Route>;
}

export default ProtectedRoute;
