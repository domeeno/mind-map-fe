import { useRoutes } from "react-router-dom";

import ProfilePage from "../pages/profile/ProfilePage";
import WelcomePage from "../pages/welcome/WelcomePage";
import NotFoundPage from "../pages/notfound/NotFoundPage";
import SubjectsListPage from "../pages/subjects/SubjectsListPage";
import AboutPage from "../pages/about/AboutPage";
import SubjectTree from "../pages/subjecttree/SubjectTree";

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
      element: <SubjectsListPage />,
      children: [
        {
          path: "/subjects/:id",
          element: <SubjectTree />,
        },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return element;
};

export default RenderRoutes;
