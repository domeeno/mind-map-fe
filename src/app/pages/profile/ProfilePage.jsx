import React, { useEffect } from "react";
import { useKeycloak } from "../../components/keycloak/KeycloakProvider";
import { useNavigate } from "react-router";
import { styles } from "../../../styles";

const ProfilePage = () => {
  const { authenticated } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/welcome");
    }
  }, [authenticated, navigate]);

  return <div className={`${styles.paddingX}`}>Profile Page</div>;
};

export default ProfilePage;
