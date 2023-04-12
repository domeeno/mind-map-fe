import { useRoutes } from "react-router-dom";

import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardMap from "../pages/map_dashboard/MapDashboard";

function RenderRoutes() {
  let element = useRoutes([
    { path: "/", element: <ProfilePage /> },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/map",
      element: <Dashboard />,
      children: [
        {
          path: "/map/:id",
          element: <DashboardMap />,
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return element;
}

export default RenderRoutes;
