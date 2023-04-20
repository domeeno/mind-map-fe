import { useRoutes } from "react-router-dom";

import ProfilePage from "../pages/profile/ProfilePage";
import WelcomePage from "../pages/welcome/WelcomePage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DashboardMapPage from "../pages/map_dashboard/MapDashboardPage";

const RenderRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <ProfilePage />,
    },
    { path: "/welcome", element: <WelcomePage /> },
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
