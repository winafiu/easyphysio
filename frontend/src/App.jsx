import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import Layout from './components/global/Layout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
