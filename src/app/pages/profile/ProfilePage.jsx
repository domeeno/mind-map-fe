import React, { useEffect } from "react";
import { useKeycloak } from "../../components/keycloak/KeycloakProvider";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { authenticated } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/welcome");
    }
  }, [authenticated]);

  return <div>Profile Page</div>;
};

export default ProfilePage;
