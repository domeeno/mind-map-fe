import { useKeycloak } from "@react-keycloak/web";
import UnauthorizedPage from "../unauthorized/UnauthorizedPage";

const ProtectedRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return isLoggedIn ? children : <UnauthorizedPage />;
};

export default ProtectedRoute;
