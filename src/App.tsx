import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from './pages/RootLayout';

import ErrorPage from './pages/ErrorPage';
import TodoListPage from "./pages/TodoListPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AuthLayout from './pages/AuthLayout/AuthLayout'
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <TodoListPage />
        },
        {
          path: 'profile',
          element: <ProfilePage />
        },
        {
          path: 'users',
          element: <AdminPanelPage />
        },
        {
          path: 'users/:userId',
          element: <UserProfilePage />
        }
      ],
    },
    {
      element: < AuthLayout />,
      children: [
        {
          path: '/authentication',
          element: <AuthenticationPage />
        },
        {
          path: '/signup',
          element: <RegistrationPage />
        }
      ]
    }
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App