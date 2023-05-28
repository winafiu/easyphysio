import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './features/error/Error'
import Home from './features/home/Home'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
