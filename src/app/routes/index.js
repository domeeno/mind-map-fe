import { useRoutes } from "react-router-dom";

import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DashboardMapPage from "../pages/map_dashboard/MapDashboardPage";

const RenderRoutes = () => {
  let element = useRoutes([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: <ProfilePage />,
    },
    {
      path: "/map",
      element: <DashboardPage />,
      children: [
        {
          path: "/map/:id",
          element: <DashboardMapPage />,
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return element;
};

export default RenderRoutes;
