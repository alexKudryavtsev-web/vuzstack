import LoginPage from '../pages/LoginPage.jsx';
import CreateAccountPage from '../pages/CreateAccountPage.jsx';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.jsx';
import SetNewPasswordPage from '../pages/SetNewPasswordPage.jsx';

import Error404Page from '../pages/Error404Page.jsx';

import ExamplePage from '../pages/ExamplePage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';

const COMMON_ROUTES = [
  { path: 'example', element: <ExamplePage /> },
  { path: '*', element: <Error404Page /> },
];

const PUBLIC_ROUTES = [
  { path: '/', element: <LoginPage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'create-account', element: <CreateAccountPage /> },
  { path: 'forgot-password', element: <ForgotPasswordPage /> },
  { path: 'update-password/:token', element: <SetNewPasswordPage /> },
  ...COMMON_ROUTES,
];

const PRIVATE_ROUTES = [
  { path: '/', element: <ProfilePage /> },
  ...COMMON_ROUTES,
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
