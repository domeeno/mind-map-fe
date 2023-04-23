import { useRoutes } from "react-router-dom";

import ProfilePage from "../pages/profile/ProfilePage";
import WelcomePage from "../pages/welcome/WelcomePage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import SubjectPage from "../pages/subjects/SubjectPage";
import AboutPage from "../pages/about/AboutPage";

const RenderRoutes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <ProfilePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    { path: "/welcome", element: <WelcomePage /> },
    {
      path: "/subjects",
      element: <SubjectPage />,
      children: [
        {
          path: "/subjects/:id",
          element: <SubjectPage />,
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return element;
};

export default RenderRoutes;
