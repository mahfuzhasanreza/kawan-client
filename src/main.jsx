import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login/Login';
import AuthProvider from './providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Professional from './components/Professional/Professional';
import ProfessionalManagement from './components/ProfessionalManagement';
import UserList from './components/UserList';
import ManageContact from './components/ManageContact';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <PrivateRoute><Home></Home></PrivateRoute>,
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'professional-verification',
        element: <PrivateRoute><Professional></Professional></PrivateRoute>,
      },
      {
        path: 'professional-management',
        element: <PrivateRoute><ProfessionalManagement></ProfessionalManagement></PrivateRoute>
      },
      {
        
        path: 'user-list',
        element: <PrivateRoute><UserList></UserList></PrivateRoute>,
      },
      {
        
        path: 'manage-contact',
        element: <PrivateRoute><ManageContact></ManageContact></PrivateRoute>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div>
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </AuthProvider>
      <Toaster />
    </HelmetProvider>
  </StrictMode>
)
