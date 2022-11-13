import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import User from "layouts/User.js";
import Auth from "layouts/Auth.js";

import Index from "views/Index.js";

import Dashboard from "views/user/Dashboard.js";
import Settings from "views/user/Settings.js";
import Tables from "views/user/Tables.js";

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

import { useRoutes } from "react-router-dom";

function AppRoutes() {
  return useRoutes([
    {
      path: "user",
      element: <User />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "settings", element: <Settings /> },
        { path: "tables", element: <Tables /> },
        { path: "", element: <Settings /> },
      ],
    },
    {
      path: "auth",
      element: <Auth />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "", element: <Login /> },
      ],
    },
    { path: "/", element: <Index /> },
    { path: "*", element: <Index /> },
  ]);
}

function App() {
  return <AppRoutes />;
}

export default App;
