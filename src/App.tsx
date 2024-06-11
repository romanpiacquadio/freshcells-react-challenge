import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/login"
import AccountPage from "./pages/account"
import ErrorPage from "./pages/error";
import CustomApolloProvider from "./providers/CustomApolloProvider";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/account",
    element: (
      <ProtectedRoute element={<AccountPage />}/>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {

  return (
    <CustomApolloProvider>
      <RouterProvider router={router} />
    </CustomApolloProvider>
  )
}

export default App
