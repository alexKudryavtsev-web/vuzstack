import LoginPage from '../pages/LoginPage.jsx';
import CreateAccountPage from '../pages/CreateAccountPage.jsx';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx';
import SetNewPasswordPage from '../pages/SetNewPasswordPage.jsx';

import Error404Page from '../pages/Error404Page.jsx';

import ProfilePage from '../pages/ProfilePage.jsx';
import ActivateUser from '../pages/ActivateUser.jsx';

import UserForm from '../components/userForm/UserForm.jsx';
import UploadMarks from '../components/marks/UploadMarks.jsx';
import UploadDirections from '../components/directions/UploadDirections.jsx';
import UploadPassport from '../components/passport/UploadPassport.jsx';
import ArticlePage from '../pages/ArticlePage.jsx';

const COMMON_ROUTES = [
  { path: '*', element: <Error404Page /> },
  { path: 'article/:id', element: <ArticlePage /> },
];

const PUBLIC_ROUTES = [
  { path: '/', element: <LoginPage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'create-account', element: <CreateAccountPage /> },
  { path: 'forgot-password', element: <ForgotPasswordPage /> },
  { path: 'update-password/:token', element: <SetNewPasswordPage /> },
  { path: 'activate-user/:token', element: <ActivateUser /> },
  ...COMMON_ROUTES,
];

const PRIVATE_ROUTES = [
  {
    path: '/',
    element: <ProfilePage />,
    children: [
      { path: 'user-form', element: <UserForm /> },
      { path: 'passport', element: <UploadPassport /> },
      { path: 'marks', element: <UploadMarks /> },
      { path: 'directions', element: <UploadDirections /> },
    ],
  },
  ...COMMON_ROUTES,
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
