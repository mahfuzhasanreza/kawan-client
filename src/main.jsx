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
import Register from './components/Register/Register';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Profile from './components/Profile/Profile';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BookDetail from './components/EBook/BookDetail/BookDetail';
import BookDashboard from './components/EBook/BookDashboard/BookDashboard';
import AllBooks from './components/EBook/AllBooks/AllBooks';
import ReadListen from './components/EBook/ReadListen/ReadListen';
import B1 from './components/EBook/Chapter/B1';
import B2 from './components/EBook/Chapter/B2';
import HealthAndNutrition from './components/HealthAndNutrition/HealthAndNutrition';
import LiveMeeting from './components/LiveMeeting/src/LiveMeeting';
import HealthDashboard from './components/HealthAndNutrition/HealthDashboard';
import HealthCal from './components/HealthAndNutrition/HealthCal';
import HealthCondition from './components/HealthAndNutrition/HealthCondition';
import SetTheGoal from './components/HealthAndNutrition/SetTheGoal';
import Blogs from './components/HealthAndNutrition/Blogs/Blogs/Blogs';
import Meditation from './components/Meditation/Meditation';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'e-book',
        element: <BookDashboard></BookDashboard>
      },
      {
        path: 'ai-chatbot',
        element: <LiveMeeting></LiveMeeting>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'forget-password',
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: 'books',
        element: <AllBooks></AllBooks>
      },
      {
        path: 'books/:id',
        element: <PrivateRoute><BookDetail></BookDetail></PrivateRoute>,
        loader: () => fetch(`https://kawan.onrender.com/api/v1/ebook`)
      },
      {
        path: 'book-read-listen/:id',
        element: <PrivateRoute><ReadListen></ReadListen></PrivateRoute>,
        loader: () => fetch(`https://kawan.onrender.com/api/v1/ebook`)
      },
      {
        path: 'b1',
        element: <PrivateRoute><B1></B1></PrivateRoute>
      },
      {
        path: 'b2',
        element: <PrivateRoute><B2></B2></PrivateRoute>
      },
      {
        path: 'health-and-nutrition',
        element: <PrivateRoute><HealthDashboard></HealthDashboard></PrivateRoute>,
      },
      {
        path: 'health-and-nutrition/progress/:healthId',
        element: <PrivateRoute><HealthCal></HealthCal></PrivateRoute>,
      },
      {
        path: 'health-and-nutrition/:type/:healthId',
        element: <PrivateRoute><HealthCondition></HealthCondition></PrivateRoute>,
      },
      {
        path: 'health-and-nutrition/goal/:healthId',
        element: <PrivateRoute><SetTheGoal></SetTheGoal></PrivateRoute>,
      },
      {
        path: 'health-and-nutrition/blogs',
        element: <PrivateRoute><Blogs></Blogs></PrivateRoute>,
        loader: () => fetch('/healthBlogData.json')
      },
      {
        path: 'meditation',
        element: <PrivateRoute><Meditation></Meditation></PrivateRoute>,
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
