import { useRoutes } from "react-router-dom";

import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DashboardMapPage from "../pages/map_dashboard/MapDashboardPage";
import ProtectedRoute from "../components/protected/ProtectedRoute";

function RenderRoutes() {
  let element = useRoutes([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },
    { path: "/login", element: <LoginPage /> },
    {
      path: "/map",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
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
}

export default RenderRoutes;
