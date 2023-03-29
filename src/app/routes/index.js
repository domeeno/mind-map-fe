import ProfilePage from "../pages/profile/ProfilePage";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import { useRoutes } from "react-router-dom";

function RenderRoutes() {
  let element = useRoutes([
    {
      path: "/",
      element: <ProfilePage />,
      // children: [
      //   {
      //   path: "messages",
      //   element: <DashboardMessages />,
      //   },
      //   { path: "tasks", element: <DashboardTasks /> },
      // ],
    },
    { path: "login", element: <LoginPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return element;
}

export default RenderRoutes;
