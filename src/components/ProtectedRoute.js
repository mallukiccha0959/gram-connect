import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  role,
}) => {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  // NOT LOGGED IN
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  // ROLE CHECK
  if (role && userInfo.role !== role) {
    return <Navigate to="/" />;
  }

  return children;

};

export default ProtectedRoute;