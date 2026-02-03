import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from './pages/RootLayout';

import ErrorPage from './pages/ErrorPage';
import TodoListPage from "./pages/TodoListPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AuthLayout from './pages/AuthLayout/AuthLayout'
import AuthForm from "./components/AuthForm/AuthForm";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <TodoListPage />,
        },
        {
          path: 'profile',
          element: <ProfilePage />
        }
      ],
    },
    {
      element: < AuthLayout />,
      children: [
        {
          path: '/authentication',
          element: <AuthForm />
        }
      ]
    }
  ]);


  return (
    <RouterProvider router={router} />
  )
}

export default App